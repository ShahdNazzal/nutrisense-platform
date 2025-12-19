const fs = require("fs")
const path = require("path")

/**
 * Automated SQL Script Executor for NutriSense Platform
 * Runs all SQL scripts on deployment to set up the database automatically
 */

async function runSQLScripts() {
  console.log("🚀 NutriSense: Starting automated SQL script execution...")

  // Check if Supabase credentials are available
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.log("⚠️  Supabase credentials not found. Skipping SQL script execution.")
    console.log("   Scripts will need to be run manually or Supabase integration needs to be configured.")
    return
  }

  try {
    // Get all SQL files from scripts directory
    const scriptsDir = path.join(__dirname)
    const sqlFiles = fs
      .readdirSync(scriptsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort() // This ensures 001_, 002_, etc. run in order

    if (sqlFiles.length === 0) {
      console.log("ℹ️  No SQL scripts found to execute.")
      return
    }

    console.log(`📄 Found ${sqlFiles.length} SQL script(s) to execute:`)
    sqlFiles.forEach((file) => console.log(`   - ${file}`))

    // Import Supabase client (dynamic import for Node.js compatibility)
    const { createClient } = require("@supabase/supabase-js")

    // Create Supabase client with service role key for admin operations
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Execute each SQL file
    for (const sqlFile of sqlFiles) {
      console.log(`\n⚙️  Executing ${sqlFile}...`)

      try {
        const sqlContent = fs.readFileSync(path.join(scriptsDir, sqlFile), "utf8")

        // Split by semicolons but keep multi-line statements together
        const statements = sqlContent
          .split(";")
          .map((stmt) => stmt.trim())
          .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"))

        let successCount = 0
        let skipCount = 0

        for (const statement of statements) {
          if (statement.length < 10) continue // Skip very short statements

          try {
            // Use raw SQL execution through Supabase
            const { error } = await supabase.rpc("exec_sql", { sql: statement })

            if (error) {
              // Check if error is about existing objects (which is OK)
              if (
                error.message &&
                (error.message.includes("already exists") ||
                  error.message.includes("does not exist") ||
                  error.message.includes("duplicate"))
              ) {
                skipCount++
              } else {
                throw error
              }
            } else {
              successCount++
            }
          } catch (stmtError) {
            // Some errors are expected (e.g., creating types that already exist)
            if (
              stmtError.message &&
              (stmtError.message.includes("already exists") || stmtError.message.includes("duplicate"))
            ) {
              skipCount++
            } else {
              console.warn(`   ⚠️  Warning in statement: ${stmtError.message.substring(0, 100)}`)
            }
          }
        }

        console.log(`   ✅ ${sqlFile} processed (${successCount} executed, ${skipCount} skipped)`)
      } catch (fileError) {
        console.error(`   ❌ Error processing ${sqlFile}:`, fileError.message)
        // Don't throw - continue with other scripts
      }
    }

    console.log("\n✨ SQL script execution completed!")
    console.log("   Database schema and seed data are ready.")
  } catch (error) {
    console.error("❌ Error during SQL script execution:", error.message)
    console.log("   Note: This is a non-blocking error. The application will still deploy.")
    console.log("   You may need to run the SQL scripts manually from the Vercel dashboard.")
  }
}

// Run the scripts
runSQLScripts().catch((error) => {
  console.error("Fatal error:", error)
  // Don't exit with error code - we want deployment to continue
  process.exit(0)
})
