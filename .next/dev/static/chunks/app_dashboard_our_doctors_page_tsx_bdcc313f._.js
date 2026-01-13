(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dashboard/our_doctors/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OurDoctorsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const doctors = [
    {
        id: 1,
        name: "Dr. Shatha Abu Hamda",
        specialty: "Gynecologist",
        phone: "0790479747-0772699665-07672699665-065658402",
        clinic: "Shmeisani – مقابل المستشفى التخصصي – شارع جابر بن حيان – عمارة رقم 56، عمان, الأردن",
        license: "Head of Female Psychiatry Unit in Al Taif MOH; Psychiatrist of Child Psychiatry Clinic in General Pediatrics.",
        image: "/shatha2.png",
        about: "head of female psychiatry unit in (Al Taif MOH Psychiatrist of child psychiatry clinic in general pediatric hospital ( Al Taif MOH ) Assistant head of acute care unit team in general psychiatry Consultant psychiatrist at Motmaena clinical center"
    },
    {
        id: 2,
        name: "Dr. Hamzah AlFaqara",
        specialty: "Internal Medicine",
        phone: "065001616",
        clinic: "Fifth Circle : kamal junblat street",
        license: "Senior Specialist in Internal Medicine, MBBS, Certificate of High Specialization",
        image: "/hamzah2.png",
        about: "Hamzah Hayel, MD Senior Specialist Internal medicine. MBBS, Certificate of High Specialization (Board) In Internal Medicine, Member of American college of physicians, JMOH-DHA-QCHP-NHRA, Member of European federation-Internal medicine."
    },
    {
        id: 3,
        name: "Dr. Muhanad Albattat",
        specialty: "Gynecologist",
        phone: "065001616",
        clinic: "Istiklal Street and Nuzha : Saadi Akash street",
        license: "Licensed Gynecologist with experience in advanced women’s health procedures",
        image: "/muhanad2.png",
        about: "Dr. Mohammad Khaled is an orthopedic surgeon with a strong background in joint replacement and sports injuries. He focuses on minimally invasive surgical techniques and rehabilitation."
    },
    {
        id: 4,
        name: "Dr. Nisreen Alhawamdeh",
        specialty: "Gynecologist",
        phone: "+962 790 688 8790 - +962 770 418 500",
        clinic: "عمان – شارع الخالدي / شارع ابن خلدون – مجمع الحياة الطبي – مبنى رقم 40 – الطابق الأول، عمان، الأردن",
        license: "Consultant Gynecologist & Obstetrician, IVF & ART, Hysteroscopy and Laparoscopic Gynecology",
        image: "/nisren2.png",
        about: "ConsultantGynecologist & obstetrician IVF & ART Hysterscopy and laparoscopic gynecology Urinary incontinece & TOT Vaginal repair"
    },
    {
        id: 5,
        name: "Dr. Malek Al Jemzawi",
        specialty: "Internist and cardiology ",
        phone: "07 9608 0051 رقم العيادة",
        clinic: "شارع الجاردنز – مقابل مستشفى الجاردنز – مجمع كومبيو جوردان – عمارة رقم 89 – الطابق الأول – مكتب 101 (Amman)",
        license: "Jordanian Board in Internal Medicine, Fellowship in Cardiology, University of Jordan",
        image: "/malek2.png",
        about: "Jordanian board in internal medicine Fellowship in cardiology- university of Jordan Bachelor degree general Medicine and surgery - university of Jordan Internist in prince hamzeh hospital previously Member in Jordanian cardiologists society"
    },
    {
        id: 6,
        name: "Dr. Amjad Jumaian",
        specialty: "Senior Consultant Psychiatrist/ Clinical Doctorate in child Psychiatry",
        phone: "+962 770 418 500",
        clinic: "عمّان – الدوار الخامس (Fifth Circle)، شارع سليمان الحديدي، مجمع جميعان – الطابق الأول (Clinic Jumian Complex)",
        license: "Jordanian Board in Psychiatry, MBBS, Retired Major General",
        image: "/amjad2.png",
        about: "Dr Amjad is a retired Major General MBBS university Jordan Jordanian board in Psychiatry and Iranian board in Child Psychiatry Member and fellow of Royal College of Psychiatrists UK MRCPSYCH FRCPSYCH and licensed to practice child psychiatry in Jordan DCPsychDiploma in Child Psychiatry London postgrad Cert child family MH Clinical Doctorate in Child Adolescent Psychiatry Exp 35 years and 5 years in the UK Founder of first child clinics in Jordan X Head psychiatry department at RMS Jordan"
    },
    {
        id: 7,
        name: "Dr. Osama Tayeh",
        specialty: "Ophthalmology specialist",
        phone: "0795361691",
        clinic: "Khilda : Khalda main street",
        license: "Specialist in Ophthalmology and Laser Vision Correction, Jordanian Board of Ophthalmology, FICO FRCS.",
        image: "/osama2.png",
        about: "Specialist in ophthalmology and laser vision correction Jordanian Board of Ophthalmology FICO FRCS (ED) MRCS (ED) Member of the American Society of Eye Surgeons."
    },
    {
        id: 8,
        name: "Dr. Riyad Tawfiq Ellati",
        specialty: "General Surgery Specialist and Plastic Surgery Fellow",
        phone: "065001616",
        clinic: "عمّان – مكة وأمّ السُمّاق – مبنى الحَجّوج / Amer bin Malik Building",
        license: "General Surgeon, Specialized in Adult Thoracic, Abdominal, and Endocrinal Surgery",
        image: "/riyad2.png",
        about: "General Surgeon Specialized in Adult Thoracic Surgery, Abdominal Surgery, Endocrinal Surgery , Adult Gastroenterological Surgery , Adult Oncology Surgery, Brain Tumor, Breast Tumor, Adult Urology Surgery and Adult General Surgery"
    },
    {
        id: 9,
        name: "Dr. Susanna Haddad",
        specialty: "dietitian for reducing weight and special illness cases",
        phone: "07 9964 4121",
        clinic: "Specialist Former Head of Nutrition Department",
        license: "Doctorate of Clinical Nutrition, Britain; European Board in Clinical Diet Compliance",
        image: "/susanna2.png",
        about: "Doctorate of Clinical nutrition, Britain European board in compliance medicine of clinical diets and nutrition therapy Programs for all illness cases Programs for reducing and gaining weight for all ages Kids nutrition sport nutrition"
    }
];
function OurDoctorsPage() {
    _s();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl md:text-4xl font-bold text-slate-800 mb-3",
                            children: "Medical Team"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-800 max-w-3xl leading-relaxed text-base md:text-lg drop-shadow-sm",
                            children: "A trusted team of certified doctors providing professional and ethical medical care. All specialists are fully licensed and verified."
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                    children: doctors.map((doctor)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative h-56 w-full overflow-hidden rounded-t-2xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: doctor.image,
                                        alt: doctor.name,
                                        fill: true,
                                        className: "object-cover group-hover:scale-105 transition-transform duration-300"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-5 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-lg font-semibold text-slate-800",
                                                    children: doctor.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-teal-600 font-medium text-sm",
                                                    children: doctor.specialty
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-slate-600 space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        "📍 ",
                                                        doctor.clinic
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        "📞 ",
                                                        doctor.phone
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                            lineNumber: 143,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-500 border-t pt-3",
                                            children: [
                                                "✔ ",
                                                doctor.license
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-slate-600 text-sm mt-2",
                                            children: [
                                                expanded === doctor.id ? doctor.about : doctor.about.length > 100 ? doctor.about.slice(0, 100) + "..." : doctor.about,
                                                doctor.about.length > 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "ml-2 text-teal-600 font-medium hover:underline",
                                                    onClick: ()=>setExpanded(expanded === doctor.id ? null : doctor.id),
                                                    children: expanded === doctor.id ? "Less" : "More"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                            lineNumber: 153,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, doctor.id, true, {
                            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                            lineNumber: 118,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/our_doctors/page.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/our_doctors/page.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/our_doctors/page.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_s(OurDoctorsPage, "rj6rT40wn8/TX8zzMJT30m5e380=");
_c = OurDoctorsPage;
var _c;
__turbopack_context__.k.register(_c, "OurDoctorsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_dashboard_our_doctors_page_tsx_bdcc313f._.js.map