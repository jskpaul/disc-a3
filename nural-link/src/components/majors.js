const programs = [
    { id: "african-studies", label: "African Studies" },
    { id: "american-studies", label: "American Studies" },
    { id: "anthropology", label: "Anthropology" },
    { id: "applied-mathematics", label: "Applied Mathematics" },
    { id: "arabic", label: "Arabic" },
    { id: "architectural-engineering-and-design", label: "Architectural Engineering and Design" },
    { id: "art-history", label: "Art History" },
    { id: "arts-administration", label: "Arts Administration" },
    { id: "art-theory-and-practice", label: "Art Theory and Practice" },
    { id: "asian-american-studies", label: "Asian American Studies" },
    { id: "asian-humanities", label: "Asian Humanities" },
    { id: "asian-languages-and-cultures", label: "Asian Languages and Cultures" },
    { id: "biological-sciences", label: "Biological Sciences" },
    { id: "biomedical-engineering", label: "Biomedical Engineering" },
    { id: "biotechnology-and-biochemical-engineering", label: "Biotechnology and Biochemical Engineering" },
    { id: "black-studies", label: "Black Studies" },
    { id: "business-enterprise", label: "Business Enterprise" },
    { id: "business-german", label: "Business German" },
    { id: "business-institutions", label: "Business Institutions" },
    { id: "catholic-studies", label: "Catholic Studies" },
    { id: "central-southeastern-european-studies", label: "Central Southeastern European Studies" },
    { id: "chemical-engineering", label: "Chemical Engineering" },
    { id: "chemistry", label: "Chemistry" },
    { id: "civic-engagement", label: "Civic Engagement" },
    { id: "civil-engineering", label: "Civil Engineering" },
    { id: "classics", label: "Classics" },
    { id: "cognitive-science", label: "Cognitive Science" },
    { id: "combined-engineering-and-communication-program", label: "Combined Engineering and Communication Program" },
    { id: "combined-music-and-engineering-program", label: "Combined Music & Engineering Program" },
    { id: "combined-music-and-communication-program", label: "Combined Music and Communication Program" },
    { id: "communication-studies", label: "Communication Studies" },
    { id: "comparative-literary-studies", label: "Comparative Literary Studies" },
    { id: "computer-engineering", label: "Computer Engineering" },
    { id: "computer-science-bs", label: "Computer Science (BS)" },
    { id: "computer-science-ba-cs", label: "Computer Science BA-CS" },
    { id: "cooperative-engineering-education-program", label: "Cooperative Engineering Education Program" },
    { id: "critical-theory", label: "Critical Theory" },
    { id: "dance", label: "Dance" },
    { id: "data-science", label: "Data Science" },
    { id: "earth-and-planetary-sciences", label: "Earth and Planetary Sciences" },
    { id: "economics", label: "Economics" },
    { id: "electrical-engineering", label: "Electrical Engineering" },
    { id: "english-creative-writing", label: "English: Creative Writing" },
    { id: "english-creative-writing-cross-genre", label: "English: Creative Writing (cross-genre)" },
    { id: "english-creative-writing-sequence-based", label: "English: Creative Writing (sequence-based)" },
    { id: "english-literature", label: "English: Literature" },
    { id: "entrepreneurship", label: "Entrepreneurship" },
    { id: "environmental-engineering", label: "Environmental Engineering" },
    { id: "environmental-policy-and-culture", label: "Environmental Policy and Culture" },
    { id: "environmental-sciences", label: "Environmental Sciences" },
    { id: "film-and-media-studies", label: "Film and Media Studies" },
    { id: "french", label: "French" },
    { id: "game-design-media-arts-and-animation", label: "Game Design, Media Arts and Animation" },
    { id: "gender-and-sexuality-studies", label: "Gender and Sexuality Studies" },
    { id: "general-music", label: "General Music" },
    { id: "geography", label: "Geography" },
    { id: "german", label: "German" },
    { id: "german-studies", label: "German Studies" },
    { id: "global-health-studies", label: "Global Health Studies" },
    { id: "greek", label: "Greek" },
    { id: "hebrew-studies", label: "Hebrew Studies" },
    { id: "history", label: "History" },
    { id: "human-communication-sciences", label: "Human Communication Sciences" },
    { id: "human-computer-interaction", label: "Human-Computer Interaction" },
    { id: "human-development-in-context", label: "Human Development in Context" },
    { id: "humanities", label: "Humanities" },
    { id: "industrial-engineering", label: "Industrial Engineering" },
    { id: "integrated-engineering-studies-mies", label: "Integrated Engineering Studies (MIES)" },
    { id: "integrated-marketing-communications-imc", label: "Integrated Marketing Communications (IMC) Undergraduate Certificate" },
    { id: "integrated-science-program", label: "Integrated Science Program" },
    { id: "international-studies", label: "International Studies" },
    { id: "italian", label: "Italian" },
    { id: "jewish-studies", label: "Jewish Studies" },
    { id: "journalism", label: "Journalism" },
    { id: "kellogg-program-for-undergraduates", label: "Kellogg Program for Undergraduates (certificate)" },
    { id: "latin", label: "Latin" },
    { id: "latina-and-latino-studies", label: "Latina and Latino Studies" },
    { id: "latin-american-and-caribbean-studies", label: "Latin American and Caribbean Studies" },
    { id: "leadership", label: "Leadership" },
    { id: "learning-and-organizational-change", label: "Learning and Organizational Change" },
    { id: "learning-sciences", label: "Learning Sciences" },
    { id: "legal-studies", label: "Legal Studies" },
    { id: "linguistics", label: "Linguistics" },
    { id: "manufacturing-design-engineering-bs-made", label: "Manufacturing & Design Engineering (BS-MaDE)" },
    { id: "materials-science-and-engineering-bs", label: "Materials Science and Engineering (BS)" },
    { id: "mathematical-methods-in-the-social-sciences", label: "Mathematical Methods in the Social Sciences" },
    { id: "mathematics", label: "Mathematics" },
    { id: "mechanical-engineering", label: "Mechanical Engineering" },
    { id: "middle-east-north-african-studies", label: "Middle East North African Studies" },
    { id: "music-cognition", label: "Music Cognition" },
    { id: "music-composition", label: "Music Composition" },
    { id: "music-criticism", label: "Music Criticism" },
    { id: "music-education", label: "Music Education" },
    { id: "musicology", label: "Musicology" },
    { id: "music-performance-brass", label: "Music Performance: Brass" },
    { id: "music-performance-jazz-studies", label: "Music Performance: Jazz Studies" },
    { id: "music-performance-percussion", label: "Music Performance: Percussion" },
    { id: "music-performance-piano", label: "Music Performance: Piano" },
    { id: "music-performance-strings", label: "Music Performance: Strings" },
    { id: "music-performance-voice-and-opera", label: "Music Performance: Voice & Opera" },
    { id: "music-performance-woodwinds", label: "Music Performance: Woodwinds" },
    { id: "music-studies-cognition", label: "Music Studies: Cognition" },
    { id: "music-studies-composition", label: "Music Studies: Composition" },
    { id: "music-studies-music-education", label: "Music Studies: Music Education" },
    { id: "music-studies-musicology", label: "Music Studies: Musicology" },
    { id: "music-studies-music-theory", label: "Music Studies: Music Theory" },
    { id: "music-technology", label: "Music Technology" },
    { id: "music-theatre", label: "Music Theatre (certificate)" },
    { id: "music-theory", label: "Music Theory" },
    { id: "native-american-and-indigenous-studies", label: "Native American and Indigenous Studies" },
    { id: "neuroscience", label: "Neuroscience" },
    { id: "performance-studies", label: "Performance Studies" },
    { id: "philosophy", label: "Philosophy" },
    { id: "physics-and-astronomy", label: "Physics and Astronomy" },
    { id: "political-science", label: "Political Science" },
    { id: "portuguese-language-and-lusophone-cultures", label: "Portuguese Language and Lusophone Cultures" },
    { id: "psychology", label: "Psychology" },
    { id: "radio-television-film", label: "Radio/Television/Film" },
    { id: "religious-studies", label: "Religious Studies" },
    { id: "russian-and-east-european-studies", label: "Russian and East European Studies" },
    { id: "russian-language-literature-and-culture", label: "Russian Language, Literature, and Culture" },
    { id: "science-in-human-culture", label: "Science in Human Culture" },
    { id: "secondary-teaching", label: "Secondary Teaching" },
    { id: "segal-design", label: "Segal Design" },
    { id: "social-policy", label: "Social Policy" },
    { id: "social-sciences-part-time", label: "Social Sciences (part-time)" },
    { id: "sociology", label: "Sociology" },
    { id: "sound-design", label: "Sound Design" },
    { id: "spanish", label: "Spanish" },
    { id: "statistics", label: "Statistics" },
    { id: "sustainability-and-energy", label: "Sustainability and Energy" },
    { id: "theatre", label: "Theatre" },
    { id: "transportation-and-logistics", label: "Transportation and Logistics" },
    { id: "world-literature", label: "World Literature" }
];

export default programs;