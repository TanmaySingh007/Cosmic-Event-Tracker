# 🌌 Cosmic Event Tracker

A stunning, interactive web application that brings the cosmos to your fingertips! Track Near-Earth Objects (NEOs) in real-time using NASA's cutting-edge APIs, with beautiful visualizations and powerful comparison tools.

## ✨ Features

### 🚀 **Live NEO Tracking**
- **Real-time Data**: Fetch live Near-Earth Object data from NASA's NeoWs API
- **Smart Grouping**: NEOs are beautifully organized by their closest approach date
- **Incremental Loading**: "Load More" button to explore additional time periods
- **Hazardous Filtering**: Toggle to show only potentially hazardous asteroids

### 🎯 **Interactive Features**
- **Multi-Selection**: Checkbox selection for comparing multiple NEOs
- **Detailed Modals**: Click any NEO to see comprehensive details including velocity, miss distance, and JPL links
- **Smart Sorting**: Sort by approach date (ascending/descending)
- **Compare Tool**: Visualize diameter vs miss distance comparisons with interactive charts

### 🌟 **Stunning Visuals**
- **NASA APOD Hero**: Daily Astronomy Picture of the Day as a dynamic banner
- **Animated Starfield**: Twinkling stars background with parallax effects
- **Floating Planets**: Subtle animated planet elements for cosmic ambiance
- **Modern UI**: Dark theme with gradient accents and smooth animations
- **Responsive Design**: Beautiful on desktop, tablet, and mobile

### 🔐 **Authentication**
- **Supabase Integration**: Secure user authentication with login/signup
- **Session Management**: Persistent login state across browser sessions
- **Protected Routes**: Access control for authenticated users

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS + Custom Animations
- **Charts**: Chart.js + react-chartjs-2
- **Authentication**: Supabase Auth
- **APIs**: NASA NeoWs + NASA APOD
- **HTTP Client**: Axios
- **Routing**: React Router DOM

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- NASA API key (free from [api.nasa.gov](https://api.nasa.gov))
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cosmic-event-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_NASA_API_KEY=your_nasa_api_key_here
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_REQUIRE_AUTH=false
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 How to Use

### **Browsing NEOs**
1. The app loads with the latest NEO data automatically
2. Browse through NEOs grouped by their closest approach date
3. Use the "Hazardous only" filter to focus on potentially dangerous objects
4. Click "Load More" to fetch additional days of data

### **Comparing Objects**
1. Select multiple NEOs using the checkboxes
2. Click the "Compare" button to see a visual comparison
3. View diameter vs miss distance charts for selected objects

### **Detailed Information**
1. Click any NEO card to open a detailed modal
2. View comprehensive data including velocity, miss distance, and JPL links
3. Access NASA's official JPL database for more information

## 🌍 API Integration

### **NASA NeoWs API**
- **Endpoint**: `https://api.nasa.gov/neo/rest/v1/feed`
- **Purpose**: Fetch Near-Earth Object data
- **Features**: Date range queries, hazard assessment, orbital data

### **NASA APOD API**
- **Endpoint**: `https://api.nasa.gov/planetary/apod`
- **Purpose**: Display daily astronomy images
- **Features**: High-resolution space photography

## 🎨 Design Philosophy

The Cosmic Event Tracker combines scientific accuracy with artistic beauty:

- **Dark Theme**: Mimics the vastness of space
- **Gradient Accents**: Purple and blue tones representing cosmic phenomena
- **Smooth Animations**: Subtle movements that don't distract from data
- **Responsive Layout**: Optimized for all screen sizes
- **Accessibility**: High contrast and readable typography

## 🚀 Deployment

### **Vercel Deployment**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_NASA_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_REQUIRE_AUTH`
4. Deploy!

### **Environment Variables**
- `VITE_NASA_API_KEY`: Your NASA API key (required)
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key
- `VITE_REQUIRE_AUTH`: Set to `false` to bypass authentication

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NASA**: For providing incredible APIs and space data
- **Supabase**: For authentication and backend services
- **React Community**: For the amazing ecosystem
- **Tailwind CSS**: For the beautiful styling framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/cosmic-event-tracker/issues) page
2. Create a new issue with detailed information
3. Include your browser, OS, and any error messages

---

**Developed with ❤️ by @TanmaySingh**

*Exploring the cosmos, one asteroid at a time* 🌌✨
