const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Extract Header (everything from <!DOCTYPE html> to the end of <div data-animation="default" class="navbarr w-nav" ... > container)
// We look for the closing </div> of the nav-container w-container, then the next </div> which closes navbarr w-nav
const headerEndIndex = html.indexOf('<section class="hero-section">');
let headerStart = "";
if (headerEndIndex !== -1) {
    headerStart = html.substring(0, headerEndIndex);
    // Remove the Webflow-specific style block that hides elements with visibility:hidden
    headerStart = headerStart.replace(/<style>\s*html\.w-mod-js:not\(\.w-mod-ix3\)\s*:is\([\s\S]*?visibility:\s*hidden\s*!important;\s*\}\s*<\/style>/g, '');

    // 1. Swap data-wf-page ID to About page ID for Achievement animations
    headerStart = headerStart.replace('data-wf-page="6902145cf044c5c880745f40"', 'data-wf-page="690b302fb7e4c77c0c63b812"');

    // 2. Remove 'i' and 'f' residual characters from menu buttons (Webflow icon font fallback artifacts)
    headerStart = headerStart.replace(/>i<\/div>/g, '></div>').replace(/>f<\/div>/g, '></div>');

    // 3. Apply absolute positioning and transparency to navbar to match Home 1
    headerStart = headerStart.replace('</head>', `
    <style>
        .navbarr { 
            position: absolute !important; 
            width: 100%; 
            background: transparent !important; 
            border: none !important;
            z-index: 1000;
        }
        .nav-dropdown-link { color: #333 !important; }
        .nav-dropdown-link:hover { background: #f8fafc !important; color: #8b001a !important; }
        .nav-button._2 { transition: color 0.3s ease; }
        .navbarr:not(.nav-scrolled) .nav-button._2 { color: #ffffff !important; }
        
        /* Ensure logo is white on transparent background */
        .navbarr:not(.nav-scrolled) .yoana { filter: brightness(0) invert(1); }
    </style>
</head>`);
}

// 2. Extract Footer (everything from <footer class="modern-footer"> to the end of the document)
const footerStartIndex = html.indexOf('<footer class="modern-footer">');
let footerEnd = "";
if (footerStartIndex !== -1) {
    footerEnd = html.substring(footerStartIndex);
}

// 3. The New Hero Section
const newHero = `
<section style="position: relative; padding: 160px 0 120px 0; background-image: url('images/pexels-leandro-paes-leme-3903752-6610689.webp'); background-attachment: fixed; background-size: cover; background-position: center; display: flex; align-items: center; min-height: 85vh;">
    <!-- Dark overlay -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(139, 0, 26, 0.6) 100%); z-index: 1;"></div>
    
    <div class="w-layout-blockcontainer w-container" style="position: relative; z-index: 2; text-align: center;">
        <div class="award-badge-wrapper" style="margin: 0 auto 30px; justify-content:center; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); backdrop-filter: blur(8px);">
            <div class="badge-text" style="color:#ffffff; font-weight: 600;">Recognized for Excellence in Public Service</div>
        </div>
        <h1 style="font-size: 4rem; color: #fff; line-height: 1.15; margin-bottom: 24px; font-weight: 700; max-width: 900px; margin-left: auto; margin-right: auto; text-shadow: 0 4px 12px rgba(0,0,0,0.3);">Serving citizens with clarity, speed, and accountability.</h1>
        <p style="color: #e2e8f0; font-size: 1.25rem; line-height: 1.6; max-width: 700px; margin: 0 auto 40px; font-weight: 400; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">Behind every service lies a commitment to the public good. We help citizens and businesses access essential government services with transparency and ease.</p>
        
        <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
            <a href="contact.html" class="main-button w-inline-block" style="background: #fff; border-color: #fff; padding: 16px 32px;">
                <div class="link-block">
                    <div class="color-text hover" style="color: #8b001a; font-weight: 600;">Submit Request</div>
                    <div class="color-text hover-2" style="color: #8b001a; font-weight: 600;">Submit Request</div>
                </div>
            </a>
            <a href="about.html" class="second-button w-inline-block" style="border-color: rgba(255,255,255,0.6); padding: 16px 32px; background: rgba(255,255,255,0.1); backdrop-filter: blur(4px);">
                <div class="link-block">
                    <div class="color-text hover" style="color: #fff; font-weight: 600;">Who We Are</div>
                    <div class="color-text hover-2" style="color: #fff; font-weight: 600;">Who We Are</div>
                </div>
            </a>
        </div>
    </div>
</section>
`;

// 4. The New Services Section
const newServices = `
<section class="service-page-section" style="padding: 80px 0px;">
    <div class="w-layout-blockcontainer w-container">
        <div style="text-align:center; margin-bottom: 60px;">
            <div class="award-badge-wrapper" style="margin: 0 auto 20px; justify-content:center;">
                <div class="badge-text" style="color:#7a0016;">Core Services</div>
            </div>
            <h2 class="service-section-title" style="width:100%; font-size: 3rem; text-align:center; margin-bottom:0px; color: #0f172a;">Essential government services for every citizen</h2>
        </div>
        
        <div class="zig-zag-row" style="display:flex; align-items:center; gap:40px; margin-bottom:60px;">
            <div class="zig-zag-content" style="flex:1;">
                <h3 class="service-title" style="margin-bottom: 20px; font-size: 2rem; color: #0f172a;">Permit & License Applications</h3>
                <p class="service-description" style="font-size:1.1rem; line-height: 1.6; margin-bottom: 30px; color:#475569;">Streamlined processing for all zoning, building, and commercial licenses required within the city limits. Our dedicated permit center ensures applications are reviewed promptly and transparently.</p>
                <a href="services.html" class="main-button w-inline-block" style="padding: 10px 20px; margin:0px;">
                    <div class="button-inner-wrapper"><div class="text-button" style="color:white;">Apply Now</div></div>
                </a>
            </div>
            <div class="zig-zag-image-wrapper" style="flex:1;">
                <img src="images/pexels-antonio-prado-1050855-3880204.webp" alt="License application" class="zig-zag-image" style="border-radius:16px; width:100%; height: 350px; object-fit:cover;">
            </div>
        </div>

        <div class="zig-zag-row" style="display:flex; align-items:center; gap:40px; margin-bottom:60px; flex-direction:row-reverse;">
            <div class="zig-zag-content" style="flex:1;">
                <h3 class="service-title" style="margin-bottom: 20px; font-size:2rem; color: #0f172a;">Document Certification & Verification</h3>
                <p class="service-description" style="font-size:1.1rem; line-height: 1.6; margin-bottom: 30px; color:#475569;">Official authentication, apostille services, and sworn translations for civic documents to be recognized locally and internationally, ensuring absolute legal validity.</p>
                <a href="services.html" class="main-button w-inline-block" style="padding: 10px 20px; margin:0px;">
                    <div class="button-inner-wrapper"><div class="text-button" style="color:white;">Certify Document</div></div>
                </a>
            </div>
            <div class="zig-zag-image-wrapper" style="flex:1;">
                <img src="images/pexels-cristian-rojas-10041261.webp" alt="Document verification" class="zig-zag-image" style="border-radius:16px; width:100%; height: 350px; object-fit:cover;">
            </div>
        </div>

        <div class="zig-zag-row" style="display:flex; align-items:center; gap:40px;">
            <div class="zig-zag-content" style="flex:1;">
                <h3 class="service-title" style="margin-bottom: 20px; font-size:2rem; color: #0f172a;">Public Records & Registry</h3>
                <p class="service-description" style="font-size:1.1rem; line-height: 1.6; margin-bottom: 30px; color:#475569;">Access civic archives, vital records, property deeds, and legislative history through our secure public registry. Submit your request easily through the portal.</p>
                <a href="services.html" class="main-button w-inline-block" style="padding: 10px 20px; margin:0px;">
                    <div class="button-inner-wrapper"><div class="text-button" style="color:white;">Search Records</div></div>
                </a>
            </div>
            <div class="zig-zag-image-wrapper" style="flex:1;">
                <img src="images/pexels-a-darmel-8133880.webp" alt="Registry building" class="zig-zag-image" style="border-radius:16px; width:100%; height: 350px; object-fit:cover;">
            </div>
        </div>
    </div>
</section>
`;

// 5. The New Impact & Statistics Section
const newStats = `
<section class="impact-section" style="background-color: #0f172a; padding: 100px 0; color: #fff;">
    <div class="w-layout-blockcontainer w-container">
        <div style="text-align:center; margin-bottom: 60px;">
            <div class="award-badge-wrapper" style="margin: 0 auto 20px; justify-content:center; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);">
                <div class="badge-text" style="color:#e2e8f0;">Our Impact</div>
            </div>
            <h2 style="font-size: 2.5rem; margin-bottom: 20px; color: #fff;">Delivering measurable results for our community</h2>
            <p style="color: #cbd5e1; max-width: 600px; margin: 0 auto; font-size: 1.1rem;">Transparency remains at the forefront of our civic operations. See how we are effectively serving the public.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; text-align: center;">
            <div style="padding: 30px; background: rgba(255,255,255,0.05); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="font-size: 3.5rem; font-weight: 700; color: #fff; margin-bottom: 10px;">1M+</div>
                <div style="color: #94a3b8; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem;">Citizens Served</div>
            </div>
            <div style="padding: 30px; background: rgba(255,255,255,0.05); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="font-size: 3.5rem; font-weight: 700; color: #fff; margin-bottom: 10px;">98%</div>
                <div style="color: #94a3b8; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem;">Processing Accuracy</div>
            </div>
            <div style="padding: 30px; background: rgba(255,255,255,0.05); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="font-size: 3.5rem; font-weight: 700; color: #fff; margin-bottom: 10px;">$40M</div>
                <div style="color: #94a3b8; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem;">Community Grants</div>
            </div>
            <div style="padding: 30px; background: rgba(255,255,255,0.05); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="font-size: 3.5rem; font-weight: 700; color: #fff; margin-bottom: 10px;">24/7</div>
                <div style="color: #94a3b8; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem;">Portal Uptime</div>
            </div>
        </div>
    </div>
</section>
`;

// 6. The New Citizen Journey Section
const newJourney = `
<section style="padding: 100px 0; background-color: #f8fafc;">
    <div class="w-layout-blockcontainer w-container">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 60px; flex-wrap: wrap; gap: 20px;">
            <div style="max-width: 600px;">
                <div class="award-badge-wrapper" style="margin-bottom: 20px;">
                    <div class="badge-text" style="color:#7a0016;">How it Works</div>
                </div>
                <h2 style="font-size: 2.5rem; color: #0f172a; margin-top:0;">Accessing services is now simpler than ever</h2>
            </div>
            <a href="services.html" class="second-button w-inline-block" style="border-color: #7a0016;">
                <div class="link-block">
                    <div class="color-text hover" style="color:#7a0016;">View All Services</div>
                    <div class="color-text hover-2" style="color:#7a0016;">View All Services</div>
                </div>
            </a>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
            <div style="background: #fff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); position: relative; overflow: hidden; border: 1px solid #e2e8f0; transition: transform 0.3s ease;">
                <div style="position: absolute; top: 0; right: 0; font-size: 15vw; font-weight: 900; line-height: 1; color: #f1f5f9; z-index: 1; pointer-events: none; opacity: 0.5;">1</div>
                <div style="position: relative; z-index: 2;">
                    <div style="width: 60px; height: 60px; background: rgba(139, 0, 26, 0.05); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: #8b001a;">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <h3 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 12px;">Submit Request</h3>
                    <p style="color: #64748b; line-height: 1.6; margin-bottom: 0;">Fill out our secure online forms for your specific civic requirement, from business licenses to document authentication.</p>
                </div>
            </div>
            <div style="background: #fff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); position: relative; overflow: hidden; border: 1px solid #e2e8f0; transition: transform 0.3s ease;">
                <div style="position: absolute; top: 0; right: 0; font-size: 15vw; font-weight: 900; line-height: 1; color: #f1f5f9; z-index: 1; pointer-events: none; opacity: 0.5;">2</div>
                <div style="position: relative; z-index: 2;">
                    <div style="width: 60px; height: 60px; background: rgba(139, 0, 26, 0.05); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: #8b001a;">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <h3 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 12px;">Review & Verify</h3>
                    <p style="color: #64748b; line-height: 1.6; margin-bottom: 0;">Our administrative officers efficiently verify your documents and process applications in complete compliance with state directives.</p>
                </div>
            </div>
            <div style="background: #fff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); position: relative; overflow: hidden; border: 1px solid #e2e8f0; transition: transform 0.3s ease;">
                <div style="position: absolute; top: 0; right: 0; font-size: 15vw; font-weight: 900; line-height: 1; color: #f1f5f9; z-index: 1; pointer-events: none; opacity: 0.5;">3</div>
                <div style="position: relative; z-index: 2;">
                    <div style="width: 60px; height: 60px; background: rgba(139, 0, 26, 0.05); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: #8b001a;">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <h3 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 12px;">Issuance & Delivery</h3>
                    <p style="color: #64748b; line-height: 1.6; margin-bottom: 0;">Receive digital access or physical delivery of approved permits, apostilles, and certifications instantly utilizing our citizen dashboard.</p>
                </div>
            </div>
        </div>
    </div>
</section>
`;

// 7. The Latest News Section
const newNews = `
<section style="padding: 100px 0; background: #fff;">
    <div class="w-layout-blockcontainer w-container">
        <div style="text-align:center; margin-bottom: 60px;">
            <div class="award-badge-wrapper" style="margin: 0 auto 20px; justify-content:center;">
                <div class="badge-text" style="color:#7a0016;">Community Updates</div>
            </div>
            <h2 style="font-size: 2.5rem; color: #0f172a; margin-top:0;">Latest civic news & announcements</h2>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
            <a href="blog.html" style="text-decoration: none; display: block; group; transition: transform 0.3s ease; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; background: #f8fafc;">
                <img src="images/pexels-shkrabaanthony-4348401.webp" style="width: 100%; height: 240px; object-fit: cover;" alt="City Planning Meeting">
                <div style="padding: 30px;">
                    <div style="color: #8b001a; font-weight: 600; font-size: 0.9rem; margin-bottom: 10px;">Urban Development • Mar 1, 2026</div>
                    <h3 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 12px; line-height: 1.4;">City Council unrolls major infrastructure investment phases</h3>
                    <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">Review the approved plans for updating downtown municipal piping and transportation grid optimization.</p>
                    <div style="color: #0f172a; font-weight: 600; display: flex; align-items: center; gap: 8px;">Read Article <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>
                </div>
            </a>
            
            <a href="blog.html" style="text-decoration: none; display: block; group; transition: transform 0.3s ease; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; background: #f8fafc;">
                <img src="images/pexels-olia-danilevich-8145455.webp" style="width: 100%; height: 240px; object-fit: cover;" alt="Service Announcement">
                <div style="padding: 30px;">
                    <div style="color: #8b001a; font-weight: 600; font-size: 0.9rem; margin-bottom: 10px;">Civic Services • Feb 24, 2026</div>
                    <h3 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 12px; line-height: 1.4;">New digital permit portal drastically reduces wait times</h3>
                    <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">An inside look into the launch of our digital-first citizen application platform serving thousands daily.</p>
                    <div style="color: #0f172a; font-weight: 600; display: flex; align-items: center; gap: 8px;">Read Article <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>
                </div>
            </a>

            <a href="blog.html" style="text-decoration: none; display: block; group; transition: transform 0.3s ease; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; background: #f8fafc;">
                <img src="images/pexels-buro-millennial-1438081.webp" style="width: 100%; height: 240px; object-fit: cover;" alt="Community Initiative">
                <div style="padding: 30px;">
                    <div style="color: #8b001a; font-weight: 600; font-size: 0.9rem; margin-bottom: 10px;">Community • Feb 15, 2026</div>
                    <h3 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 12px; line-height: 1.4;">Spring neighborhood beautification grant winners announced</h3>
                    <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">Check the roster of community groups awarded funding to upgrade public parks across five major districts.</p>
                    <div style="color: #0f172a; font-weight: 600; display: flex; align-items: center; gap: 8px;">Read Article <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>
                </div>
            </a>
        </div>
    </div>
</section>
`;

// 8. The New Call To Action Section
const newCTA = `
<section style="background: linear-gradient(135deg, #8b001a 0%, #4a000e 100%); padding: 100px 0; position: relative; overflow: hidden;">
    <!-- Abstract subtle shapes -->
    <div style="position: absolute; width: 400px; height: 400px; background: rgba(255,255,255,0.05); border-radius: 50%; top: -100px; right: -100px;"></div>
    <div style="position: absolute; width: 600px; height: 600px; border: 2px solid rgba(255,255,255,0.05); border-radius: 50%; bottom: -200px; left: -200px;"></div>
    
    <div class="w-layout-blockcontainer w-container" style="position: relative; z-index: 2; text-align: center;">
        <h2 style="font-size: 3rem; color: #fff; margin-bottom: 24px; max-width: 800px; margin-left: auto; margin-right: auto;">Ready to access your civic dashboard?</h2>
        <p style="color: #f1f5f9; font-size: 1.2rem; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto;">Create an account today to seamlessly track applications, verify documents securely, and update commercial registrations.</p>
        
        <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
            <a href="dashboard.html" class="main-button w-inline-block" style="background: #fff; border-color: #fff;">
                <div class="link-block">
                    <div class="color-text hover" style="color: #8b001a;">Enter Dashboard</div>
                    <div class="color-text hover-2" style="color: #8b001a;">Enter Dashboard</div>
                </div>
            </a>
            <a href="contact.html" class="second-button w-inline-block" style="border-color: rgba(255,255,255,0.4);">
                <div class="link-block">
                    <div class="color-text hover" style="color: #fff;">Contact Support</div>
                    <div class="color-text hover-2" style="color: #fff;">Contact Support</div>
                </div>
            </a>
        </div>
    </div>
</section>
`;

// 9. Reassemble into index2.html
const newIndex2 = headerStart + newHero + newServices + newStats + newJourney + newNews + newCTA + footerEnd;
fs.writeFileSync('index2.html', newIndex2, 'utf8');

console.log("Created index2.html comprising Header, Split Hero, Zig-Zag Services, Impact, Journey, News, CTA, and Footer.");
