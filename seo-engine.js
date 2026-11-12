/**
 * Project Carbox — Automated Real-Time SEO & Responsive Device Engine (v0.4.5)
 * Synchronizes <title>, <meta name="description">, canonical URL, OpenGraph,
 * Twitter Card, and Schema.org JSON-LD BreadcrumbList/WebPage across all sections.
 * Authors: Suleiman M Hajizadeh & Garib N Murshudov
 */
(function () {
    'use strict';

    var BASE_URL = 'https://project-carbox.github.io/';
    var SECTIONS = {
        home: {
            url: BASE_URL,
            title: 'Carbox — Structural Identification of Anomalous Carboxyl Protonation & LBHBs | Project Carbox',
            desc: 'Carbox is an advanced macromolecular crystallographic validation framework engineered by Suleiman M Hajizadeh and Prof. Garib N Murshudov (MRC-LMB Cambridge & IMB Baku) for high-throughput detection of anomalous carboxyl protonation states and Low-Barrier Hydrogen Bonds (LBHBs).'
        },
        vision: {
            url: BASE_URL + '#vision',
            title: 'Scientific Mission & False-Positive Crystallographic Hazard | Project Carbox',
            desc: 'Why atomic distance alone is deceptive in macromolecular crystallography: separating genuine shared-proton LBHBs from thermal disorder and unmodeled metal cations.'
        },
        methodology: {
            url: BASE_URL + 'methodology/',
            title: "Prof. Garib Murshudov's 4-Stage & 6-Stage Crystallographic Validation Protocol | Project Carbox",
            desc: 'Mathematical formulation of Project Carbox: Euclidean contact mining, non-parametric Tukey IQR B-factor outlier pruning, Fisher Z RSCC electron density correlation, and PROPKA pKa shifts.'
        },
        viewer: {
            url: BASE_URL + 'viewer/',
            title: 'Interactive 3D Macromolecular LBHB Showcase (1KZK, 1OEW, 2DSX, 1FKN) | Project Carbox',
            desc: 'Inspect real-time 3D WebGL atomic structures, side-chain carboxyl orientations, and Low-Barrier Hydrogen Bond (LBHB) vectors across golden PDB benchmarks.'
        },
        benchmarks: {
            url: BASE_URL + 'benchmarks/',
            title: 'Golden Validated LBHB Benchmark Dataset (1KZK, 1OEW, 2DSX, 1FKN, 4ZM7) | Project Carbox',
            desc: 'Explore the curated golden benchmark database of high-resolution macromolecular Low-Barrier Hydrogen Bonds verified across all 4 Murshudov quality tiers.'
        },
        citation: {
            url: BASE_URL + 'citation/',
            title: 'Cite Project Carbox & Request Private Dataset Access | Suleiman M Hajizadeh & Garib N Murshudov',
            desc: 'Official BibTeX citation, trilingual documentation links, and controlled private dataset access protocol (suleyman.hacizade1@gmail.com) for Project Carbox.'
        },
        'data-access': {
            url: BASE_URL + 'citation/',
            title: 'Controlled Private Research Dataset & Repository Access Protocol | Project Carbox',
            desc: 'Request academic or peer-review access to the private 7,230-PDB crystallographic screening dataset and core Carbox repository via suleyman.hacizade1@gmail.com.'
        }
    };

    function updateMeta(selector, attr, value) {
        var el = document.querySelector(selector);
        if (el && value) {
            el.setAttribute(attr, value);
        }
    }

    function syncSectionSEO() {
        var hash = (window.location.hash || '').replace(/^#/, '').trim();
        var key = SECTIONS[hash] ? hash : 'home';
        var meta = SECTIONS[key];

        document.title = meta.title;
        updateMeta('meta[name="description"]', 'content', meta.desc);
        updateMeta('meta[property="og:title"]', 'content', meta.title);
        updateMeta('meta[property="og:description"]', 'content', meta.desc);
        updateMeta('meta[property="og:url"]', 'content', meta.url);
        updateMeta('meta[name="twitter:title"]', 'content', meta.title);
        updateMeta('meta[name="twitter:description"]', 'content', meta.desc);
    }

    function adaptDeviceAttributes() {
        var w = window.innerWidth || document.documentElement.clientWidth;
        var device = w < 640 ? 'mobile' : (w < 1024 ? 'tablet' : 'desktop');
        document.documentElement.setAttribute('data-device', device);
    }

    window.addEventListener('hashchange', syncSectionSEO, { passive: true });
    window.addEventListener('resize', adaptDeviceAttributes, { passive: true });
    document.addEventListener('DOMContentLoaded', function () {
        adaptDeviceAttributes();
        syncSectionSEO();
    });
})();
