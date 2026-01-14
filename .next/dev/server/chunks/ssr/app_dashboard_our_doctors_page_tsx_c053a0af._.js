module.exports = [
"[project]/app/dashboard/our_doctors/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OurDoctorsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const doctors = [
    {
        id: 1,
        name: "Dr. Shatha Abu Hamda",
        specialty: "Psychiatrist",
        phone: "0790479747-0772699665-07672699665-065658402",
        clinic: "Shmeisani – مقابل المستشفى التخصصي – شارع جابر بن حيان – عمارة رقم 56، عمان, الأردن",
        license: "Head of Female Psychiatry Unit in Al Taif MOH; Psychiatrist of Child Psychiatry Clinic in General Pediatrics.",
        image: "/shatha.jpg",
        about: "head of female psychiatry unit in (Al Taif MOH Psychiatrist of child psychiatry clinic in general pediatric hospital ( Al Taif MOH ) Assistant head of acute care unit team in general psychiatry Consultant psychiatrist at Motmaena clinical center"
    },
    {
        id: 2,
        name: "Dr. Hamzah AlFaqara",
        specialty: "Internal Medicine",
        phone: "065001616",
        clinic: "Fifth Circle : kamal junblat street",
        license: "Senior Specialist in Internal Medicine, MBBS, Certificate of High Specialization",
        image: "/hamzah.jpg",
        about: "Hamzah Hayel, MD Senior Specialist Internal medicine. MBBS, Certificate of High Specialization (Board) In Internal Medicine, Member of American college of physicians, JMOH-DHA-QCHP-NHRA, Member of European federation-Internal medicine."
    },
    {
        id: 3,
        name: "Coatch Ahmad Zaarer",
        specialty: "Fitness",
        phone: "0791819010",
        clinic: "gym:Ayass fitness Amman almadina al monwarah street",
        license: "Email : Azaarer@yahoo.com",
        image: "/coatch2.jpg",
        about: "Dr. Mohammad Khaled is an orthopedic surgeon with a strong background in joint replacement and sports injuries. He focuses on minimally invasive surgical techniques and rehabilitation."
    },
    {
        id: 4,
        name: "Dr. Nisreen Alhawamdeh",
        specialty: "Gynecologist",
        phone: "+962 790 688 8790 - +962 770 418 500",
        clinic: "عمان – شارع الخالدي / شارع ابن خلدون – مجمع الحياة الطبي – مبنى رقم 40 – الطابق الأول، عمان، الأردن",
        license: "Consultant Gynecologist & Obstetrician, IVF & ART, Hysteroscopy and Laparoscopic Gynecology",
        image: "/nisren.jpg",
        about: "ConsultantGynecologist & obstetrician IVF & ART Hysterscopy and laparoscopic gynecology Urinary incontinece & TOT Vaginal repair"
    },
    {
        id: 5,
        name: "Dr. Malek Al Jemzawi",
        specialty: "Internist and cardiology ",
        phone: "07 9608 0051 رقم العيادة",
        clinic: "شارع الجاردنز – مقابل مستشفى الجاردنز – مجمع كومبيو جوردان – عمارة رقم 89 – الطابق الأول – مكتب 101 (Amman)",
        license: "Jordanian Board in Internal Medicine, Fellowship in Cardiology, University of Jordan",
        image: "/malek.jpg",
        about: "Jordanian board in internal medicine Fellowship in cardiology- university of Jordan Bachelor degree general Medicine and surgery - university of Jordan Internist in prince hamzeh hospital previously Member in Jordanian cardiologists society"
    },
    {
        id: 6,
        name: "Dr. Amjad Jumaian",
        specialty: "Senior Consultant Psychiatrist/ Clinical Doctorate in child Psychiatry",
        phone: "+962 770 418 500",
        clinic: "عمّان – الدوار الخامس (Fifth Circle)، شارع سليمان الحديدي، مجمع جميعان – الطابق الأول (Clinic Jumian Complex)",
        license: "Jordanian Board in Psychiatry, MBBS, Retired Major General",
        image: "/amjad.jpg.png",
        about: "Dr Amjad is a retired Major General MBBS university Jordan Jordanian board in Psychiatry and Iranian board in Child Psychiatry Member and fellow of Royal College of Psychiatrists UK MRCPSYCH FRCPSYCH and licensed to practice child psychiatry in Jordan DCPsychDiploma in Child Psychiatry London postgrad Cert child family MH Clinical Doctorate in Child Adolescent Psychiatry Exp 35 years and 5 years in the UK Founder of first child clinics in Jordan X Head psychiatry department at RMS Jordan"
    },
    {
        id: 7,
        name: "Dr. Osama Tayeh",
        specialty: "Ophthalmology specialist",
        phone: "0795361691",
        clinic: "Khilda : Khalda main street",
        license: "Specialist in Ophthalmology and Laser Vision Correction, Jordanian Board of Ophthalmology, FICO FRCS.",
        image: "/osama.jpg",
        about: "Specialist in ophthalmology and laser vision correction Jordanian Board of Ophthalmology FICO FRCS (ED) MRCS (ED) Member of the American Society of Eye Surgeons."
    },
    {
        id: 8,
        name: "Dr. Riyad Tawfiq Ellati",
        specialty: "General Surgery Specialist and Plastic Surgery Fellow",
        phone: "065001616",
        clinic: "عمّان – مكة وأمّ السُمّاق – مبنى الحَجّوج / Amer bin Malik Building",
        license: "General Surgeon, Specialized in Adult Thoracic, Abdominal, and Endocrinal Surgery",
        image: "/raid.jpg",
        about: "General Surgeon Specialized in Adult Thoracic Surgery, Abdominal Surgery, Endocrinal Surgery , Adult Gastroenterological Surgery , Adult Oncology Surgery, Brain Tumor, Breast Tumor, Adult Urology Surgery and Adult General Surgery"
    },
    {
        id: 9,
        name: "Dr. Susanna Haddad",
        specialty: "Nutrition , dietitian for reducing weight and special illness cases",
        phone: "07 9964 4121",
        clinic: "Specialist Former Head of Nutrition Department",
        license: "Doctorate of Clinical Nutrition, Britain; European Board in Clinical Diet Compliance",
        image: "/sunna.jpg",
        about: "Doctorate of Clinical nutrition, Britain European board in compliance medicine of clinical diets and nutrition therapy Programs for all illness cases Programs for reducing and gaining weight for all ages Kids nutrition sport nutrition"
    }
];
function OurDoctorsPage() {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl md:text-4xl font-bold text-slate-800 mb-3",
                            children: "Medical Team"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-800 max-w-3xl leading-relaxed text-base md:text-lg drop-shadow-sm",
                            children: "A trusted team of certified doctors providing professional and ethical medical care. All specialists are fully licensed and verified."
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                    children: doctors.map((doctor)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative h-56 w-full overflow-hidden rounded-t-2xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: doctor.image,
                                        alt: doctor.name,
                                        fill: true,
                                        className: "object-cover group-hover:scale-105 transition-transform duration-300"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-5 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-lg font-semibold text-slate-800",
                                                    children: doctor.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-teal-600 font-medium text-sm",
                                                    children: doctor.specialty
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                            lineNumber: 139,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-slate-600 space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        "📍 ",
                                                        doctor.clinic
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        "📞 ",
                                                        doctor.phone
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-500 border-t pt-3",
                                            children: [
                                                "✔ ",
                                                doctor.license
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                            lineNumber: 153,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-slate-600 text-sm mt-2",
                                            children: [
                                                expanded === doctor.id ? doctor.about : doctor.about.length > 100 ? doctor.about.slice(0, 100) + "..." : doctor.about,
                                                doctor.about.length > 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "ml-2 text-teal-600 font-medium hover:underline",
                                                    onClick: ()=>setExpanded(expanded === doctor.id ? null : doctor.id),
                                                    children: expanded === doctor.id ? "Less" : "More"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                            lineNumber: 158,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, doctor.id, true, {
                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
            lineNumber: 108,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/our_doctors/page.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_dashboard_our_doctors_page_tsx_c053a0af._.js.map