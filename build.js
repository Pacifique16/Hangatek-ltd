// Build script to combine modular files into single files
const fs = require('fs');
const path = require('path');

// Function to read file content
function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error.message);
        return '';
    }
}

// Function to write file content
function writeFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Created ${filePath}`);
    } catch (error) {
        console.error(`Error writing ${filePath}:`, error.message);
    }
}

// Build combined CSS
function buildCSS() {
    const cssFiles = [
        'css/base.css',
        'css/components/header.css',
        'css/components/footer.css',
        'css/components/modals.css',
        'css/components/whatsapp.css',
        'css/sections/hero.css',
        'css/sections/about.css',
        'css/sections/services.css',
        'css/sections/portfolio.css',
        'css/sections/testimonials.css',
        'css/sections/team.css',
        'css/sections/faq.css',
        'css/sections/contact.css'
    ];

    let combinedCSS = '';
    cssFiles.forEach(file => {
        const content = readFile(file);
        if (content) {
            combinedCSS += `/* ${file} */\n${content}\n\n`;
        }
    });

    writeFile('css/combined.css', combinedCSS);
}

// Build combined HTML
function buildHTML() {
    const htmlFiles = [
        'components/header.html',
        'sections/hero.html',
        'sections/about.html',
        'sections/services.html',
        'sections/portfolio.html',
        'sections/testimonials.html',
        'sections/team.html',
        'sections/faq.html',
        'sections/contact.html',
        'components/footer.html',
        'components/modals.html'
    ];

    let combinedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hangatek - Code Your Future</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/combined.css">
</head>
<body>
`;

    htmlFiles.forEach(file => {
        const content = readFile(file);
        if (content) {
            // Remove the comment from the beginning if it exists
            const cleanContent = content.replace(/^<!-- .*? -->\s*/, '');
            combinedHTML += cleanContent + '\n';
        }
    });

    combinedHTML += `
    <script src="js/combined.js" defer></script>
</body>
</html>`;

    writeFile('index.html', combinedHTML);
}

// Build combined JavaScript
function buildJS() {
    const jsFiles = [
        'js/modules/dom-elements.js',
        'js/modules/state.js',
        'js/modules/header.js',
        'js/modules/carousel.js',
        'js/modules/testimonials.js',
        'js/modules/portfolio.js',
        'js/modules/faq.js',
        'js/modules/forms.js'
    ];

    let combinedJS = '';
    jsFiles.forEach(file => {
        const content = readFile(file);
        if (content) {
            // Remove export statements and convert to regular JS
            const cleanContent = content
                .replace(/export\s+{[^}]+}\s+from\s+['"][^'"]+['"];?\s*/g, '')
                .replace(/export\s+const\s+/g, 'const ')
                .replace(/export\s+class\s+/g, 'class ')
                .replace(/import\s+{[^}]+}\s+from\s+['"][^'"]+['"];?\s*/g, '');
            combinedJS += `/* ${file} */\n${cleanContent}\n\n`;
        }
    });

    // Add initialization code
    combinedJS += `
// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeaderManager();
    new CarouselManager();
    new TestimonialsManager();
    new PortfolioManager();
    new FAQManager();
    new FormsManager();
});`;

    writeFile('js/combined.js', combinedJS);
}

// Run build
console.log('🚀 Building Hangatek website...');
buildCSS();
buildHTML();
buildJS();
console.log('✅ Build complete! Check index.html, css/combined.css, and js/combined.js');
