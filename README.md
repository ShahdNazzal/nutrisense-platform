# NutriSense Platform

A comprehensive health and nutrition platform with AI-powered features, built with Next.js and Supabase.

## Features

### 🏥 Core Health Management
- User registration and authentication with Supabase
- Personalized health dashboards
- BMI and health metrics tracking
- Appointment booking system
- Secure doctor-patient messaging

### 🤰 Pregnancy Care Module
- Trimester-based tracking
- Pregnancy weight gain monitoring
- Prenatal nutrition guidance
- Specialized meal planning

### 💪 Athletes & Fitness Module
- Athletic performance tracking
- Body composition analysis
- Training frequency monitoring
- Sports-specific nutrition plans

### 🤖 AI/ML-Powered Features
- **Deep Learning Image Analysis**: Upload medical test images for AI-powered analysis
- **Machine Learning Health Prediction**: Get personalized health risk assessments
- **AI Nutrition Chatbot**: Ask questions about nutrition, diet, and healthy living

### 📊 Nutrition Management
- Meal planning and tracking
- Nutritional analysis
- Food logging
- Personalized dietary recommendations

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI**: React 19, Tailwind CSS v4, shadcn/ui
- **AI/ML**: Custom API endpoints with fallback dummy data
- **Deployment**: Vercel

## Color Scheme

The platform uses a professional blue color scheme (#007BFF and variants) for a trustworthy healthcare aesthetic.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Vercel account (for deployment)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in Vercel or `.env.local`:
   ```
   SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### Deployment

The platform is configured for automatic deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add Supabase integration in Vercel
3. Deploy - SQL scripts will run automatically via `vercel-build` script

The `vercel-build` script automatically:
- Builds the Next.js application
- Executes all SQL scripts in order (001_, 002_, etc.)
- Sets up database schema and seed data
- Configures Row Level Security policies

## Database Schema

The platform includes comprehensive database tables:
- `profiles` - User profiles and basic info
- `health_metrics` - Weight, BMI, vital signs
- `pregnancy_data` - Pregnancy-specific tracking
- `athlete_data` - Athletic performance metrics
- `meal_plans` & `meals` - Nutrition planning
- `appointments` - Doctor appointments
- `messages` - Doctor-patient communication
- `nutritional_analysis` - AI analysis results
- `doctors` - Doctor profiles and availability

All tables include Row Level Security (RLS) policies for data protection.

## AI/ML Integration

The platform includes three AI-powered endpoints with placeholder data for seamless development and deployment:

### Placeholder Data Structure

**📁 `/public/dl_model_images/`**
- `sample_results.json` - Example analysis results for medical test images
- `placeholder-test-image.jpg` - Sample medical test image
- Purpose: Store uploaded images and provide fallback responses

**📁 `/public/ml_chatbot/`**
- `sample_chat.json` - Example conversation pairs for chatbot responses
- Purpose: Provide intelligent fallback responses until real NLP integration

These folders ensure the application runs without errors during development and deployment. Replace with real ML models when ready.

### API Endpoints

### 1. Image Analysis (`/api/ml/analyze-image`)
- Accepts medical test images
- Returns AI-analyzed results with confidence scores
- Currently reads from `/public/dl_model_images/sample_results.json`
- Ready for real ML API integration

### 2. Health Prediction (`/api/ml/predict-health`)
- Accepts patient health data
- Returns risk assessments and health scores
- Provides personalized recommendations

### 3. AI Chatbot (`/api/ml/chatbot`)
- Natural language processing for nutrition queries
- Context-aware responses based on user type
- Reads from `/public/ml_chatbot/sample_chat.json` for fallback responses
- Ready for NLP API integration

### Integrating Real ML APIs

To connect real ML/DL services, update the API routes:

```typescript
// Example: app/api/ml/analyze-image/route.ts
const response = await fetch('https://your-ml-api.com/analyze', {
  method: 'POST',
  body: formData,
  headers: { 'Authorization': `Bearer ${process.env.ML_API_KEY}` }
})
```

Add the API key to your environment variables in Vercel:
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add `ML_API_KEY` with your actual API key
3. Redeploy the application

The placeholder data structure remains unchanged, making the transition seamless.

## Security

- All database tables have Row Level Security enabled
- User data is isolated with RLS policies
- Passwords are managed by Supabase Auth
- Service role key is only used server-side

## Support

For issues or questions, please open an issue on GitHub or contact support.

## License

Proprietary - NutriSense Platform
