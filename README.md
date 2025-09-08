# Cheerful Campaign Creation Flow  

This project is a **Next.js implementation** of the "Campaign Creation Flow" based on the provided Figma design. The goal was to convert the design into an interactive, responsive, and functional web application within a 2-hour time limit, leveraging AI tools for speed and accuracy.  

---

## 🚀 Setup Instructions  

1. **Clone the repository**  
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run the development server**  
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.  

---

## 🛠️ AI Tools & Prompts Used  

This project was built with the help of AI-assisted coding tools:  

- **Vercel v0**: Used for initial design generation and component creation based on Figma designs
- **Cursor AI**: Used as the main AI pair programmer to scaffold Next.js components and refine UI logic
- **Claude**: Used for advanced problem-solving, feature implementation, and optimization

### Example Prompts
1. *"Please recreate the UI shown in the attached Figma frame as accurately as possible. the design is of a stepper, the user selects a campaign type from the provided boxes which indicates the type of campaigns. on the click of others it shows a text area in place of the campaigns type just like shown in the attahed screenshot. Also below we can see faded next step as well. once done and click next the step 2 which is showing below will slide up and show the content of step 2. Similarly this will be done for all 4 steps. make sure to add other steps aswell just empty."*  
2. *"here is the deisgn of steps 2 new product tab flow. this will show when user uploads a file."*  
3. *"When user uploads some content the scan button will enable and it will show loading like the attached file before moving to the next step"*  
4. *"after the scan is done this will show in the step 2 which will show the details of whatever was scanned"*  
5. *"each step will have a height of 60vh and showing in center of the screen. when i go on step 2 the step 1 will scroll up and step 2 will show in the main area and become active with colored borders. the previous and next step will show partially and faded on top and bottom in the remaining screen area. the left indicators will remain fix"*  
6. *"User should not be able to just scroll to the next step. they could only do so by the cards actions buttons. also the insides of the cards will be scrollable when there content is overflow. user could scroll only the inside of the card when the inside of the card overflows"*  

---

## 🎨 Design Decisions  

- **Next.js + React** were chosen for fast iteration and clean component-based development.  
- **Tailwind CSS** provided quick responsive styling aligned with the Figma design.  
- Created **mock data** based on fields visible in the Figma (campaign details, steps, inputs).  
- Implemented **step-by-step navigation** for the campaign flow (Next / Back buttons).  
- Made the UI **responsive for desktop and mobile** using Flex/Grid.  
- **Component-Based**: Modular step components for maintainability
- **Centralized Data**: JSON-based data management for easy updates
- **TypeScript**: Full type safety for better development experience
- **Controlled Navigation**: Users can only navigate via action buttons
- **Loading States**: Clear feedback during async operations

---

## ⚡ What I'd Improve With More Time  

- Add **form validation and error states** (currently minimal).  
- Integrate with a **real backend API** for campaign creation and persistence.  
- Enhance **pixel-perfect fidelity** to match Figma (spacing, typography, animations).  
- Add **unit tests** for components and navigation logic.  
- Implement **accessibility improvements** (ARIA roles, keyboard navigation).  
- **Error Boundaries**: React error boundaries for better error handling
- **State Management**: Redux/Zustand for complex state
- **Animation Library**: Framer Motion for smoother transitions

---

## 📒 AI Usage Log  

- **Vercel v0**: Used for initial design generation and component creation
- **Cursor AI**: Used for component scaffolding, TypeScript implementation, and bug fixing
- **Claude**: Used for advanced problem-solving, feature implementation, and optimization

### Fixed AI Outputs
- Fixed **TypeScript Errors**: Resolved type mismatches in file upload handlers
- Fixed **Import Path Issues**: Resolved module resolution problems  
- Fixed **State Management**: Improved prop passing and state updates
- Fixed **Component Architecture**: Refactored for better maintainability
- Adjusted auto-generated form fields to align with Figma design.  
- Fixed navigation logic where AI code skipped the last step.  
- Cleaned up unused imports and simplified props.  

---

## ✅ Evaluation Notes  

This submission focuses on:  
- **Technical Execution**: Functional flow across 4 campaign creation screens.  
- **AI Proficiency**: Multiple AI tools used effectively, with refinement of AI code.  
- **Problem Solving**: Debugged navigation issues, built mock data, ensured responsiveness.  
- **Communication**: Clear documentation and reasoning behind decisions.  

---

Built with ❤️ using AI-assisted development tools.
