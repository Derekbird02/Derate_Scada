const sites = [
    { siteId: "5000632", siteName: 'Beaver Ridge', customer: 'Jay Cashman', tHsl: ["4.5"], automation: false },
    { siteId: "50003479", siteName: 'Big Level Wind', customer: 'Transalta', tHsl: ["90"], automation: false },
    { siteId: "5001028", siteName: 'Bishop Hill I', customer: 'Brookfield', tHsl: ["104.7", "104.8"], automation: false },
    { siteId: "5000872", siteName: 'Briscoe', customer: 'Capital Dynamics', tHsl: ["149.85"], automation: false },
    { siteId: "5002141", siteName: 'Bull Hill', customer: 'Brookfield', tHsl: ["34.485"], automation: false },
    { siteId: "5000512", siteName: 'California Ridge', customer: 'Brookfield', tHsl: ["111.54", "114.92"], automation: false },
    { siteId: "5000380", siteName: 'Canton Mountain', customer: 'CPV', tHsl: ["22.4"], automation: false },
    { siteId: "50006723", siteName: 'Cohocton Repower', customer: 'Brookfield', tHsl: ["125"], automation: false },
    { siteId: "5000311", siteName: 'Dermott 1 Wind', customer: 'Orsted', tHsl: ["126.5", "126.5"], automation: false },
    { siteId: "5000446", siteName: 'Electra Digby', customer: 'Skyline', tHsl: ["98.9", "131.1"], automation: false },
    { siteId: "50007302", siteName: 'Ford Ridge', customer: 'Orsted', tHsl: ["120"], automation: false },
    { siteId: "5000419", siteName: 'Horse Creek', customer: 'Skyline', tHsl: ["131.1", "98.9"], automation: false },
    { siteId: "5000629", siteName: 'Horseshoe Bend', customer: 'Brookfield', tHsl: ["145", "145"], automation: false },
    { siteId: "5000890", siteName: 'Jericho Power', customer: 'Leeward', tHsl: ["14"], automation: false },
    { siteId: "5000506", siteName: 'Kaheawa Wind I', customer: 'Brookfield', tHsl: ["30"], automation: false },
    { siteId: "5000556", siteName: 'Kaheawa Wind II', customer: 'Brookfield', tHsl: ["21"], automation: false },
    { siteId: "5000542", siteName: 'Kent Breeze', customer: 'Transalta', tHsl: ["20"], automation: false },
    { siteId: "50007140", siteName: 'Lincoln Land', customer: 'Orsted', tHsl: ["175.46", "127.35"], automation: false },
    { siteId: "50002979", siteName: 'Lockett Wind', customer: 'Orsted', tHsl: ["187.5"], automation: false },
    { siteId: "50005680", siteName: 'Loraine', customer: 'Third Planet Wind', tHsl: ["48","51","25.5","24"], automation: false },
    { siteId: "5000624", siteName: 'Mars Hill', customer: 'Brookfield', tHsl: ["42"], automation: false },
    { siteId: "5000626", siteName: 'North Hurlburt', customer: 'Brookfield', tHsl: ["132.5", "132.5"], automation: false },
    { siteId: "5001097", siteName: 'North West Ohio_Trishe', customer: 'CMS Energy', tHsl: ["100"], automation: false },
    { siteId: "Permian_Solar", siteName: 'Permian Solar', customer: 'Orsted', tHsl: ["186.6", "233.3"], automation: false },
    { siteId: "50004385", siteName: 'Plum Creek', customer: 'Orsted', tHsl: ["230"], automation: false },
    { siteId: "5000516", siteName: 'Prairie Breeze', customer: 'Brookfield', tHsl: ["100.3", "100.3"], automation: false },
    { siteId: "5000593", siteName: 'Raleigh', customer: 'Brookfield', tHsl: ["78"], automation: false },
    { siteId: "5001094", siteName: 'Rattlesnake Den', customer: 'Brookfield', tHsl: ["109.15", "109.15"], automation: false },
    { siteId: "5000603", siteName: 'Rollins', customer: 'Brookfield', tHsl: ["60"], automation: false },
    { siteId: "50006799", siteName: 'Rox Wind', customer: 'Greenbacker', tHsl: ["15.3"], automation: false },
    { siteId: "5000722", siteName: 'Saddleback', customer: 'CPV', tHsl: ["33.6"], automation: false },
    { siteId: "50003568", siteName: 'Sage Draw', customer: 'Orsted', tHsl: ["169.3", "169.3"], automation: false },
    { siteId: "5000649", siteName: 'Shannon Wind', customer: 'Alterra Power Corp', tHsl: ["202.3"], automation: false },
    { siteId: "5000627", siteName: 'South Hurlburt', customer: 'Brookfield', tHsl: ["145", "145"], automation: false },
    { siteId: "50002642", siteName: 'South Plains', customer: 'Brookfield', tHsl: ["102", "98"], automation: false },
    { siteId: "5002383", siteName: 'Sparta Solar', customer: 'Orsted', tHsl: ["146.25", "104"], automation: false },
    { siteId: "50006639", siteName: 'Steel Winds Repower', customer: 'Brookfield', tHsl: ["35"], automation: false },
    { siteId: "5000717", siteName: 'Stephens Ranch I', customer: 'Starwood', tHsl: ["200"], automation: false },
    { siteId: "5001066", siteName: 'Stephens Ranch II', customer: 'Starwood', tHsl: ["156"], automation: false },
    { siteId: "5000816", siteName: 'Stetson Mountain I', customer: 'Brookfield', tHsl: ["57"], automation: false },
    { siteId: "STETSON_MOUNTAIN_II", siteName: 'Stetson Mountain II', customer: 'Brookfield', tHsl: ["25.5"], automation: false },
    { siteId: "5002299", siteName: 'Sunflower', customer: 'Orsted', tHsl: ["109.2", "103.6"], automation: false },
    { siteId: "500111", siteName: 'Tahoka Staked Plains', customer: 'Orsted', tHsl: ["150", "150"], automation: false },
    { siteId: "50005819", siteName: 'Western Trail', customer: 'Orsted', tHsl: ["226.4", "141.5"], automation: false },
    { siteId: "50004823", siteName: 'Willow Creek', customer: 'Orsted', tHsl: ["103.9"], automation: false },
    { siteId: "5000328", siteName: 'Willow Springs', customer: 'Orsted', tHsl: ["125", "125"], automation: false },
    { siteId: "5000504", siteName: 'Wintering Hills', customer: 'IKEA', tHsl: ["88"], automation: false },
];




export default sites;

