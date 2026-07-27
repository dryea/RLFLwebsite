/* 
   Reliance Finance Limited - Shared Components (Header & Footer)
   Dynamically injects templates to keep code DRY and consistent.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Determine path depth prefix
    const isSubdir = window.location.pathname.includes('/savings/') || 
                     window.location.pathname.includes('\\savings\\') || 
                     window.location.pathname.includes('/loans/') || 
                     window.location.pathname.includes('\\loans\\') ||
                     window.location.pathname.includes('/about/') ||
                     window.location.pathname.includes('\\about\\') ||
                     window.location.pathname.includes('/fixed-deposits/') ||
                     window.location.pathname.includes('\\fixed-deposits\\');
    const pathPrefix = isSubdir ? '../' : './';

    // 1. Inject Header
    const headerEl = document.getElementById('header');
    if (headerEl) {
        headerEl.innerHTML = `
            <div class="top-bar">
                <div class="container top-bar-content">
                    <div class="top-bar-left">
                        <a href="tel:+977015361104" class="top-bar-link">
                            <i class="fas fa-phone-alt"></i> +977-01-5361104
                        </a>
                        <a href="mailto:info@reliancenepal.com.np" class="top-bar-link">
                            <i class="far fa-envelope"></i> info@reliancenepal.com.np
                        </a>
                    </div>
                    <div class="top-bar-right">
                        <a href="${pathPrefix}contact.html?form=loan" class="top-bar-link">Loan Enquiry Form</a>
                        <a href="${pathPrefix}contact.html?form=grievance" class="top-bar-link">Grievance Portal</a>
                        <a href="${pathPrefix}branches.html" class="top-bar-link">Branches</a>
                        <a href="${pathPrefix}news.html#training" class="top-bar-link">Careers</a>
                        <div class="lang-switch">
                            <button class="lang-btn active" id="lang-en" onclick="window.switchLanguage('en')">
                                <img src="https://reliancenepal.com.np/assets/images/reliance/en_flag.png" alt="English"> EN
                            </button>
                            <button class="lang-btn" id="lang-np" onclick="window.switchLanguage('np')">
                                <img src="https://reliancenepal.com.np/assets/images/reliance/nep_flag.png" alt="Nepali"> ने
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <header class="main-header">
                <div class="container nav-container">
                    <a href="${pathPrefix}index.html" class="logo">
                        <img src="https://reliancenepal.com.np/assets/images/reliance/logo.png" alt="Reliance Finance Limited">
                    </a>
                    
                    <button class="hamburger" id="hamburger-toggle" aria-label="Toggle Navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    
                    <nav class="nav-menu" id="nav-menu">
                        <div class="nav-item">
                            <a href="${pathPrefix}index.html" class="nav-link">Home</a>
                        </div>
                        
                        <!-- ABOUT US MEGA MENU -->
                        <div class="nav-item mega-dropdown">
                            <a href="${pathPrefix}about.html" class="nav-link">About Us <i class="fas fa-chevron-down"></i></a>
                            <div class="mega-menu-content">
                                <div class="mega-menu-grid">
                                    <!-- Column 1: Company Profile -->
                                    <div class="mega-menu-column">
                                        <h5>Company Profile</h5>
                                        <div class="mega-menu-links">
                                            <div class="mega-menu-item-wrapper">
                                                <a href="${pathPrefix}about.html" class="mega-menu-item">
                                                    <i class="fas fa-info-circle"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">About Reliance Finance</span>
                                                        <span class="mega-menu-item-desc">Learn about our heritage, journey, and values.</span>
                                                    </div>
                                                </a>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}about/introduction.html">Introduction</a>
                                                    <a href="${pathPrefix}about/mission-vision.html">Mission & Goals</a>
                                                    <a href="${pathPrefix}about/timeline.html">Milestones</a>
                                                </div>
                                            </div>
                                            <a href="${pathPrefix}about/framework.html" class="mega-menu-item">
                                                <i class="fas fa-chess"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Strategic Framework</span>
                                                    <span class="mega-menu-item-desc">Our vision and corporate growth path.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}about/capital.html" class="mega-menu-item">
                                                <i class="fas fa-coins"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Capital Structure</span>
                                                    <span class="mega-menu-item-desc">Capital breakdown and financial strength.</span>
                                                </div>
                                            </a>
                                            <div class="mega-menu-item-wrapper">
                                                <div class="mega-menu-item">
                                                    <i class="fas fa-shield-alt"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">FAQ & Policies</span>
                                                        <span class="mega-menu-item-desc">Customer guidelines, security, and disclosures.</span>
                                                    </div>
                                                </div>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}about/faq.html">FAQ</a>
                                                    <a href="${pathPrefix}about/privacy.html">Privacy Policy</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Column 2: Leadership & Staff -->
                                    <div class="mega-menu-column">
                                        <h5>Leadership & Staff</h5>
                                        <div class="mega-menu-links">
                                            <a href="${pathPrefix}bod.html" class="mega-menu-item">
                                                <i class="fas fa-users-cog"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Board of Directors</span>
                                                    <span class="mega-menu-item-desc">Visionary board steering the institution.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}governance.html#committees" class="mega-menu-item">
                                                <i class="fas fa-user-friends"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Committee of Directors</span>
                                                    <span class="mega-menu-item-desc">Board committees ensuring oversight.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}management-team.html" class="mega-menu-item">
                                                <i class="fas fa-briefcase"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Management Team</span>
                                                    <span class="mega-menu-item-desc">Executive team managing daily operations.</span>
                                                </div>
                                            </a>
                                            <div class="mega-menu-item-wrapper">
                                                <div class="mega-menu-item">
                                                    <i class="fas fa-sitemap"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">Key Personnel</span>
                                                        <span class="mega-menu-item-desc">Department heads and branch network.</span>
                                                    </div>
                                                </div>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}hod.html">Head of Departments</a>
                                                    <a href="${pathPrefix}branch-managers.html">Branch Managers</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Column 3: Governance & Operations -->
                                    <div class="mega-menu-column">
                                        <h5>Governance & Operations</h5>
                                        <div class="mega-menu-links">
                                            <a href="${pathPrefix}governance.html" class="mega-menu-item">
                                                <i class="fas fa-balance-scale"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Corporate Governance</span>
                                                    <span class="mega-menu-item-desc">Regulatory compliance and framework details.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}csr.html" class="mega-menu-item">
                                                <i class="fas fa-hand-holding-heart"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">CSR Activities</span>
                                                    <span class="mega-menu-item-desc">Our contributions to society and communities.</span>
                                                </div>
                                            </a>
                                            <div class="mega-menu-item-wrapper">
                                                <div class="mega-menu-item">
                                                    <i class="fas fa-user-check"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">Designated Officers</span>
                                                        <span class="mega-menu-item-desc">Compliance, secretarial and contact officers.</span>
                                                    </div>
                                                </div>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}governance.html#compliance">Compliance Officer</a>
                                                    <a href="${pathPrefix}governance.html#secretary">Company Secretary</a>
                                                    <a href="${pathPrefix}governance.html#grievance-officer">Grievance Officer</a>
                                                </div>
                                            </div>
                                            <div class="mega-menu-item-wrapper">
                                                <div class="mega-menu-item">
                                                    <i class="fas fa-leaf"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">Sustainable Finance</span>
                                                        <span class="mega-menu-item-desc">Green banking and environmental activities.</span>
                                                    </div>
                                                </div>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}governance.html#sustainable-banking">Sustainable Banking</a>
                                                    <a href="${pathPrefix}governance.html#environmental">Environmental Activities</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- PRODUCTS & SERVICES MEGA MENU -->
                        <div class="nav-item mega-dropdown">
                            <a href="#" class="nav-link">Products & Services <i class="fas fa-chevron-down"></i></a>
                            <div class="mega-menu-content">
                                <div class="mega-menu-grid">
                                    <!-- Column 1: Savings & Deposits -->
                                    <div class="mega-menu-column">
                                        <h5>Savings & Deposits</h5>
                                        <div class="mega-menu-links">
                                            <div class="mega-menu-item-wrapper">
                                                <a href="${pathPrefix}savings.html" class="mega-menu-item">
                                                    <i class="fas fa-piggy-bank"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">Saving Deposit Accounts</span>
                                                        <span class="mega-menu-item-desc">Interest-bearing options designed for everyone.</span>
                                                    </div>
                                                </a>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}savings/normal.html">Normal</a>
                                                    <a href="${pathPrefix}savings/investor.html">Investor's</a>
                                                    <a href="${pathPrefix}savings/special.html">Special</a>
                                                    <a href="${pathPrefix}savings/student.html">Student</a>
                                                    <a href="${pathPrefix}savings/shareholder.html">Shareholder</a>
                                                    <a href="${pathPrefix}savings/pwd.html">PWD</a>
                                                    <a href="${pathPrefix}savings/khutruke.html">Khutruke</a>
                                                    <a href="${pathPrefix}savings/dhaulagiri.html">Dhaulagiri</a>
                                                    <a href="${pathPrefix}savings/kanchanjunga.html">Kanchanjunga</a>
                                                    <a href="${pathPrefix}savings/everest.html">Everest</a>
                                                    <a href="${pathPrefix}savings/super.html">Super</a>
                                                    <a href="${pathPrefix}savings/gold.html">Gold</a>
                                                    <a href="${pathPrefix}savings/diamond.html">Diamond</a>
                                                    <a href="${pathPrefix}savings/sarathi.html">Sarathi</a>
                                                </div>
                                            </div>
                                            <div class="mega-menu-item-wrapper">
                                                <a href="${pathPrefix}fixed-deposits.html" class="mega-menu-item">
                                                    <i class="fas fa-vault"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">Fixed Deposits</span>
                                                        <span class="mega-menu-item-desc">High-yield investment plans with flexible tenures.</span>
                                                    </div>
                                                </a>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}fixed-deposits/individual.html">Individual FD</a>
                                                    <a href="${pathPrefix}fixed-deposits/corporate.html">Corporate FD</a>
                                                    <a href="${pathPrefix}fixed-deposits/remittance.html">Remittance FD</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Column 2: Loans & Credit -->
                                    <div class="mega-menu-column">
                                        <h5>Loans & Credit</h5>
                                        <div class="mega-menu-links">
                                            <a href="${pathPrefix}loans/business.html" class="mega-menu-item">
                                                <i class="fas fa-store"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Business Loans</span>
                                                    <span class="mega-menu-item-desc">Empower your enterprise with customized plans.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}loans/home.html" class="mega-menu-item">
                                                <i class="fas fa-home"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Home & Land Loans</span>
                                                    <span class="mega-menu-item-desc">Purchase, build, or renovate your dream home.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}loans/agricultural.html" class="mega-menu-item">
                                                <i class="fas fa-seedling"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Agricultural Loans</span>
                                                    <span class="mega-menu-item-desc">Special financing for farming and agro-projects.</span>
                                                </div>
                                            </a>
                                            <div class="mega-menu-item-wrapper">
                                                <a href="${pathPrefix}loans.html" class="mega-menu-item">
                                                    <i class="fas fa-hand-holding-usd"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">Other Credit Facilities</span>
                                                        <span class="mega-menu-item-desc">Credit options for personal and investment needs.</span>
                                                    </div>
                                                </a>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}loans/auto.html">Auto Loan</a>
                                                    <a href="${pathPrefix}loans/hire-purchase.html">Hire Purchase</a>
                                                    <a href="${pathPrefix}loans/share.html">Share Loan</a>
                                                    <a href="${pathPrefix}loans/education.html">Education Loan</a>
                                                    <a href="${pathPrefix}loans/personal.html">Personal Loan</a>
                                                    <a href="${pathPrefix}loans/fd.html">FD Loan</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Column 3: Digital Banking & Services -->
                                    <div class="mega-menu-column">
                                        <h5>Digital & Services</h5>
                                        <div class="mega-menu-links">
                                            <a href="${pathPrefix}services.html" class="mega-menu-item">
                                                <i class="fas fa-concierge-bell"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Services Overview</span>
                                                    <span class="mega-menu-item-desc">Explore our full suite of premium banking services.</span>
                                                </div>
                                            </a>
                                            <div class="mega-menu-item-wrapper">
                                                <div class="mega-menu-item">
                                                    <i class="fas fa-mobile-alt"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">Digital Channels</span>
                                                        <span class="mega-menu-item-desc">Convenient 24/7 digital transactions.</span>
                                                    </div>
                                                </div>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}services.html#mobile-banking">Mobile Banking</a>
                                                    <a href="${pathPrefix}services.html#sms-banking">SMS Banking</a>
                                                    <a href="${pathPrefix}services.html#qr-teller">QR Teller</a>
                                                </div>
                                            </div>
                                            <div class="mega-menu-item-wrapper">
                                                <div class="mega-menu-item">
                                                    <i class="fas fa-exchange-alt"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">Payments & Transfers</span>
                                                        <span class="mega-menu-item-desc">Secure payment and settlement channels.</span>
                                                    </div>
                                                </div>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}services.html#connect-ips">Connect IPS</a>
                                                    <a href="${pathPrefix}services.html#rtgs">connectRTGS</a>
                                                    <a href="${pathPrefix}services.html#corporatepay">CORPORATEPAY</a>
                                                </div>
                                            </div>
                                            <div class="mega-menu-item-wrapper">
                                                <div class="mega-menu-item">
                                                    <i class="fas fa-check-double"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">Clearing & Other Services</span>
                                                        <span class="mega-menu-item-desc">Utility payments, debit cards, and clearing.</span>
                                                    </div>
                                                </div>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}services.html#ips">IPS</a>
                                                    <a href="${pathPrefix}services.html#ecc">ECC Clearing</a>
                                                    <a href="${pathPrefix}services.html#c-asba">C-ASBA</a>
                                                    <a href="${pathPrefix}services.html#debit-card">Debit Card</a>
                                                    <a href="${pathPrefix}services.html#abbs">ABBS</a>
                                                    <a href="${pathPrefix}services.html#remittance">Remittance</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- RATES & TOOLS MEDIUM MENU -->
                        <div class="nav-item">
                            <a href="${pathPrefix}rates.html" class="nav-link">Rates & Tools <i class="fas fa-chevron-down"></i></a>
                            <div class="mega-menu-medium">
                                <div class="mega-menu-medium-grid">
                                    <div class="mega-menu-column">
                                        <h5>Rates & Disclosures</h5>
                                        <div class="mega-menu-links">
                                            <a href="${pathPrefix}rates.html#interest" class="mega-menu-item">
                                                <i class="fas fa-percent"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Interest Rates</span>
                                                    <span class="mega-menu-item-desc">Latest rates on deposits and credits.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}rates.html#spread" class="mega-menu-item">
                                                <i class="fas fa-chart-pie"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Base & Spread Rates</span>
                                                    <span class="mega-menu-item-desc">Base rates and interest spreads.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}rates.html#charges" class="mega-menu-item">
                                                <i class="fas fa-file-invoice-dollar"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Tariff Charges</span>
                                                    <span class="mega-menu-item-desc">Fees and service charges structure.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}rates.html#forex" class="mega-menu-item">
                                                <i class="fas fa-dollar-sign"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Forex Rates</span>
                                                    <span class="mega-menu-item-desc">Daily foreign currency exchange.</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="mega-menu-column">
                                        <h5>Calculators & Tools</h5>
                                        <div class="mega-menu-links">
                                            <a href="${pathPrefix}emi.html" class="mega-menu-item">
                                                <i class="fas fa-calculator"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">EMI Calculator</span>
                                                    <span class="mega-menu-item-desc">Estimate monthly installments easily.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}contact.html?form=loan" class="mega-menu-item">
                                                <i class="fas fa-file-signature"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Loan Enquiry Form</span>
                                                    <span class="mega-menu-item-desc">Apply or request details online.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}contact.html?form=grievance" class="mega-menu-item">
                                                <i class="fas fa-comment-dots"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Grievance Portal</span>
                                                    <span class="mega-menu-item-desc">Submit feedback or complaints.</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- PUBLICATIONS & NOTICES MEDIUM MENU -->
                        <div class="nav-item">
                            <a href="${pathPrefix}news.html" class="nav-link">Publications <i class="fas fa-chevron-down"></i></a>
                            <div class="mega-menu-medium">
                                <div class="mega-menu-medium-grid">
                                    <div class="mega-menu-column">
                                        <h5>Notices & News</h5>
                                        <div class="mega-menu-links">
                                            <div class="mega-menu-item-wrapper">
                                                <a href="${pathPrefix}news.html#notices" class="mega-menu-item">
                                                    <i class="fas fa-bullhorn"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">General & AGM Notices</span>
                                                        <span class="mega-menu-item-desc">Annual meetings, dividends, and listings.</span>
                                                    </div>
                                                </a>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}news.html#notices">AGM Notice</a>
                                                    <a href="${pathPrefix}news.html#notices">Dividend Info</a>
                                                    <a href="${pathPrefix}news.html#notices">Unclaimed Div</a>
                                                </div>
                                            </div>
                                            <a href="${pathPrefix}news.html#auction" class="mega-menu-item">
                                                <i class="fas fa-gavel"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Auctions & Tenders</span>
                                                    <span class="mega-menu-item-desc">View active asset auctions and tenders.</span>
                                                </div>
                                            </a>
                                            <div class="mega-menu-item-wrapper">
                                                <div class="mega-menu-item">
                                                    <i class="fas fa-newspaper"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">Media & Updates</span>
                                                        <span class="mega-menu-item-desc">Latest news, press releases, and events.</span>
                                                    </div>
                                                </div>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}news.html#news">News</a>
                                                    <a href="${pathPrefix}news.html#events">Events</a>
                                                    <a href="${pathPrefix}news.html#training">Training List</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mega-menu-column">
                                        <h5>Corporate Reports</h5>
                                        <div class="mega-menu-links">
                                            <div class="mega-menu-item-wrapper">
                                                <div class="mega-menu-item">
                                                    <i class="fas fa-file-pdf"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">Financial Reports</span>
                                                        <span class="mega-menu-item-desc">Official statements and audits.</span>
                                                    </div>
                                                </div>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}news.html#reports">Annual Reports</a>
                                                    <a href="${pathPrefix}news.html#reports">Quarterly Reports</a>
                                                    <a href="${pathPrefix}news.html#reports">AGM Minutes</a>
                                                </div>
                                            </div>
                                            <div class="mega-menu-item-wrapper">
                                                <div class="mega-menu-item">
                                                    <i class="fas fa-shield-alt"></i>
                                                    <div class="mega-menu-item-text">
                                                        <span class="mega-menu-item-title">Regulatory Disclosures</span>
                                                        <span class="mega-menu-item-desc">Basel II, SEBON, and official filings.</span>
                                                    </div>
                                                </div>
                                                <div class="mega-menu-sublinks">
                                                    <a href="${pathPrefix}news.html#reports">Basel II</a>
                                                    <a href="${pathPrefix}news.html#reports">SEBON Reports</a>
                                                </div>
                                            </div>
                                            <a href="${pathPrefix}news.html#notices" class="mega-menu-item">
                                                <i class="fas fa-info-circle"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Right to Information</span>
                                                    <span class="mega-menu-item-desc">Transparency disclosures and listings.</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- NETWORK & SUPPORT MEDIUM MENU -->
                        <div class="nav-item">
                            <a href="${pathPrefix}branches.html" class="nav-link">Network & Support <i class="fas fa-chevron-down"></i></a>
                            <div class="mega-menu-medium">
                                <div class="mega-menu-medium-grid">
                                    <div class="mega-menu-column">
                                        <h5>Our Network</h5>
                                        <div class="mega-menu-links">
                                            <a href="${pathPrefix}branches.html" class="mega-menu-item">
                                                <i class="fas fa-map-marked-alt"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Branch Network</span>
                                                    <span class="mega-menu-item-desc">Find our physical branches across Nepal.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}branches.html#partners" class="mega-menu-item">
                                                <i class="fas fa-handshake"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Our Partners</span>
                                                    <span class="mega-menu-item-desc">Payment, clearing, and digital partners.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}branches.html#offers" class="mega-menu-item">
                                                <i class="fas fa-tags"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Merchants & Offers</span>
                                                    <span class="mega-menu-item-desc">Exclusive discounts for RFL card holders.</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="mega-menu-column">
                                        <h5>Help Desk & Support</h5>
                                        <div class="mega-menu-links">
                                            <a href="${pathPrefix}contact.html" class="mega-menu-item">
                                                <i class="fas fa-headset"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Contact Us</span>
                                                    <span class="mega-menu-item-desc">Get in touch with support representatives.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}contact.html#head-office" class="mega-menu-item">
                                                <i class="fas fa-map-marker-alt"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Head Office Detail</span>
                                                    <span class="mega-menu-item-desc">Kamaladi, Kathmandu corporate contacts.</span>
                                                </div>
                                            </a>
                                            <a href="${pathPrefix}contact.html?form=feedback" class="mega-menu-item">
                                                <i class="fas fa-envelope-open-text"></i>
                                                <div class="mega-menu-item-text">
                                                    <span class="mega-menu-item-title">Customer Feedback</span>
                                                    <span class="mega-menu-item-desc">Share feedback or send dynamic inquiries.</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        `;
    }

    // 2. Inject Footer
    const footerEl = document.getElementById('footer');
    if (footerEl) {
        footerEl.innerHTML = `
            <div class="container footer-top">
                <div class="footer-widget" style="grid-column: span 2;">
                    <a href="${pathPrefix}index.html" class="footer-widget-logo">
                        <img src="https://reliancenepal.com.np/assets/images/reliance/Reliance Logo_For Web_3.png" alt="RFL Logo">
                    </a>
                    <p>Reliance Finance Limited, a leading "C" class licensed financial institution in Nepal, is committed to providing trust-based, customized, and premium financial services across the nation.</p>
                    <div class="footer-social-icons">
                        <a href="https://www.facebook.com/reliancefinanceltd/" class="social-icon" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/reliancefinanceltd/" class="social-icon" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="https://invite.viber.com/?g2=AQBrZz8OAV%2BDHEyStTd00AxchrcNvPbNEo%2Ffod8KjA0xzbM1A6Pw8V7LaSI0EDgv" class="social-icon" target="_blank" aria-label="Viber"><i class="fab fa-viber"></i></a>
                    </div>
                </div>
                
                <div class="footer-widget">
                    <h4>Quick Links</h4>
                    <ul class="footer-links-list">
                        <li><a href="${pathPrefix}about.html"><i class="fas fa-chevron-right" style="font-size:0.7rem;"></i> Company Profile</a></li>
                        <li><a href="${pathPrefix}rates.html"><i class="fas fa-chevron-right" style="font-size:0.7rem;"></i> Interest Rates</a></li>
                        <li><a href="${pathPrefix}emi.html"><i class="fas fa-chevron-right" style="font-size:0.7rem;"></i> EMI Calculator</a></li>
                        <li><a href="${pathPrefix}branches.html"><i class="fas fa-chevron-right" style="font-size:0.7rem;"></i> Our Branches</a></li>
                        <li><a href="${pathPrefix}news.html"><i class="fas fa-chevron-right" style="font-size:0.7rem;"></i> Media & Events</a></li>
                    </ul>
                </div>
                
                <div class="footer-widget">
                    <h4>Products</h4>
                    <ul class="footer-links-list">
                        <li><a href="${pathPrefix}savings.html"><i class="fas fa-chevron-right" style="font-size:0.7rem;"></i> Saving Deposit</a></li>
                        <li><a href="${pathPrefix}fixed-deposits.html"><i class="fas fa-chevron-right" style="font-size:0.7rem;"></i> Fixed Deposit</a></li>
                        <li><a href="${pathPrefix}loans.html"><i class="fas fa-chevron-right" style="font-size:0.7rem;"></i> Business Loan</a></li>
                        <li><a href="${pathPrefix}loans/home.html"><i class="fas fa-chevron-right" style="font-size:0.7rem;"></i> Home Loan</a></li>
                        <li><a href="${pathPrefix}loans/auto.html"><i class="fas fa-chevron-right" style="font-size:0.7rem;"></i> Auto Loan</a></li>
                    </ul>
                </div>
                
                <div class="footer-widget" style="grid-column: span 2;">
                    <h4>Head Office Contact</h4>
                    <div class="footer-contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Reliance Bhawan, Kamaladi, Kathmandu-01, Nepal</span>
                    </div>
                    <div class="footer-contact-item">
                        <i class="fas fa-phone-alt"></i>
                        <span>+977-01-5361104, 5323117, 5361041</span>
                    </div>
                    <div class="footer-contact-item">
                        <i class="far fa-envelope"></i>
                        <span>info@reliancenepal.com.np</span>
                    </div>
                    <div class="footer-contact-item">
                        <i class="fas fa-print"></i>
                        <span>PO Box: 20136</span>
                    </div>
                </div>
            </div>
            
            <div class="container footer-bottom">
                <span>Copyright © 2026 Reliance Finance Limited. All Rights Reserved.</span>
                <div class="footer-bottom-links">
                    <a href="${pathPrefix}about/privacy.html">Privacy Policy</a>
                    <a href="${pathPrefix}about/faq.html">Terms of Use</a>
                    <a href="${pathPrefix}contact.html?form=grievance">Grievance Handling</a>
                </div>
            </div>
        `;
    }

    // 3. Navigation Scrolling Behavior
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 4. Highlight Active Navigation Item
    const currentPath = window.location.pathname.split("/").pop();
    const isProductSubpage = window.location.pathname.includes('/savings/') || 
                             window.location.pathname.includes('/loans/') || 
                             window.location.pathname.includes('/fixed-deposits/');
    const isAboutSubpage = window.location.pathname.includes('/about/') || 
                           window.location.pathname.includes('/about.html') || 
                           window.location.pathname.includes('/bod.html') || 
                           window.location.pathname.includes('/governance.html') || 
                           window.location.pathname.includes('/management-team.html') || 
                           window.location.pathname.includes('/hod.html') || 
                           window.location.pathname.includes('/branch-managers.html') || 
                           window.location.pathname.includes('/csr.html');
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent.trim().toLowerCase();
        
        if (isProductSubpage && text.includes('products')) {
            link.classList.add('active');
        } else if (isAboutSubpage && text.includes('about')) {
            link.classList.add('active');
        } else if (href) {
            const cleanHref = href.replace('../', '').replace('./', '').split('?')[0];
            if (cleanHref === currentPath || (currentPath === "" && cleanHref === "index.html")) {
                link.classList.add('active');
            }
        }
    });

    // 5. Mobile Hamburger Interaction
    const hamburger = document.getElementById('hamburger-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }

    // 6. Mobile Dropdown Toggle (Accordion style on mobile)
    const mobileDropdowns = document.querySelectorAll('.nav-link');
    mobileDropdowns.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 992 && link.nextElementSibling && (
                link.nextElementSibling.classList.contains('dropdown-menu') ||
                link.nextElementSibling.classList.contains('mega-menu-content') ||
                link.nextElementSibling.classList.contains('mega-menu-medium')
            )) {
                e.preventDefault();
                const parent = link.parentElement;
                parent.classList.toggle('active-mobile');
            }
        });
    });
});

// Global Language Switcher mockup
window.switchLanguage = (lang) => {
    const btnEn = document.getElementById('lang-en');
    const btnNp = document.getElementById('lang-np');
    if (lang === 'en') {
        btnEn.classList.add('active');
        btnNp.classList.remove('active');
        alert("Language switched to English (Simulation)");
    } else {
        btnNp.classList.add('active');
        btnEn.classList.remove('active');
        alert("नेपाली भाषामा रूपान्तरित गरियो (सिमुलेशन)");
    }
};
