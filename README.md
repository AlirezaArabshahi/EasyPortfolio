# Alireza Arabshahi - Personal Website

A modern, interactive personal website built with a clean template system and dynamic content management.

## 🚀 Features

- **Interactive Tetris Animation** - Canvas-based tech-themed falling blocks
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Template System** - Separate content from code for easy maintenance
- **Clean Architecture** - Modular CSS, JavaScript, and HTML structure

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Animation**: Canvas API
- **Build System**: Node.js
- **Version Control**: Git with branch-based versioning

## 📁 Project Structure

```
├── assets/
│   ├── css/
│   │   └── styles.css          # Main stylesheet
│   └── js/
│       └── tetris-animation.js # Interactive animation
├── src/                        # Development files (local only)
│   ├── template.html          # HTML template with variables
│   ├── variables.json         # Content variables
│   └── build.js              # Build script
├── index.html                 # Production website
└── README.md
```

## 🔧 Development

### Prerequisites
- Node.js (for build system)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/alirezaarabshahi/alirezaarabshahi.github.io.git
   cd alirezaarabshahi.github.io
   ```

2. **Edit content** (local development only)
   ```bash
   # Edit variables.json to change content
   # Edit template.html to change structure
   ```

3. **Build the website**
   ```bash
   node build.js
   ```

### Content Management

Content is managed through a simple template system:

- **variables.json** - Contains all text content, links, and metadata
- **template.html** - HTML structure with `{{VARIABLE}}` placeholders
- **build.js** - Processes template and generates final HTML

Example content update:
```json
{
  "NAME": "Your Name",
  "SKILLS": ["JavaScript", "React", "Node.js"],
  "GITHUB_URL": "https://github.com/yourusername"
}
```

## 🌟 Features

### Interactive Animation
- Tech-themed falling blocks animation
- Mouse interaction and hover effects
- Click to create explosion effects
- Responsive canvas sizing

### Responsive Design
- Mobile-first approach
- Flexible grid layout
- Optimized for all screen sizes

## 🚀 Deployment

The website is automatically deployed via GitHub Pages from the `main` branch.

**Live Site**: [https://alirezaarabshahi.github.io](https://alirezaarabshahi.github.io)

## 📝 Version History

- **v1.0** - Initial release with static content
- **v2.0** - Template system and content management
- **v3.0** - Planned: Enhanced animations and features

## 🤝 Contributing

This is a personal website, but suggestions and feedback are welcome!

## 📄 License & Usage

**Want to use this code for your project?** 

Absolutely! I'm happy to share my work with the developer community. The answer is **yes, with proper attribution**.

### 🎯 Usage Guidelines

I believe in open source and sharing knowledge, but **respect for original work matters**. I've put considerable time and creativity into building this website, and I'm excited to see others learn from it!

**Here's what I ask:**
1. **Acknowledge the original work** - don't present it as entirely your own creation
2. **Include a link back** to this repository or my website
3. **Maintain author credits** in the source code
4. **Add a note in your project**: "Inspired by [Alireza Arabshahi's portfolio](https://alirezaarabshahi.github.io)"

### 📝 How to Give Proper Attribution

**In your README.md:**
```markdown
## Credits
This website is based on [Alireza Arabshahi's work](https://alirezaarabshahi.github.io)
Original code: https://github.com/alirezaarabshahi/alirezaarabshahi.github.io
```

**In your code comments:**
```javascript
// Based on Alireza Arabshahi's Tetris Animation
// Original: https://alirezaarabshahi.github.io
```

**On your website (footer or about page):**
```html
<a href="https://alirezaarabshahi.github.io">Design inspired by Alireza Arabshahi</a>
```

### ✅ You're welcome to:
- Build upon this code for your personal projects
- Customize and modify the design to fit your needs
- Use it for learning and educational purposes
- Share it with others (with proper attribution)
- Create your own portfolio based on this design

### ❌ Please don't:
- Strip away author information from the code
- Present this as your original work without acknowledgment
- Sell this code as a template or product
- Use for commercial purposes without permission
- Redistribute without any attribution

**A simple credit goes a long way in supporting open source! 🙏**

### 📞 Questions About Usage?

If you want to:
- Use this commercially
- Discuss a specific use case
- Ask about permissions
- Report issues or bugs

Feel free to reach out:
- 📧 **Email:** arabshahii.alireza@gmail.com
- 💼 **LinkedIn:** [alirezaarabshahi](https://www.linkedin.com/in/alirezaarabshahi)
- 🌐 **Website:** [alirezaarabshahi.github.io](https://alirezaarabshahi.github.io)

This project is licensed under **Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)**

---

## ⭐ Show Your Support

If you found this project helpful or inspiring, please consider:

- **⭐ Starring this repository** - it helps others discover the project
- **🔗 Sharing with fellow developers** who might find it useful
- **💬 Providing feedback** or suggestions for improvement
- **🐛 Reporting issues** if you find any bugs

**Your star means a lot and motivates me to create more open source projects! 🚀**

## 📧 Contact

- **GitHub**: [@alirezaarabshahi](https://github.com/alirezaarabshahi)
- **LinkedIn**: [alirezaarabshahi](https://www.linkedin.com/in/alirezaarabshahi)
- **Email**: arabshahii.alireza@gmail.com