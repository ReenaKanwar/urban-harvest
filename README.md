# Urban Harvest - Premium Admin Dashboard Portal

Urban Harvest is a responsive and visually stunning admin/delivery dashboard for a fictional organic food delivery platform. This application features a premium dark-organic theme, modular React components, dynamic state management powered by Redux, and custom SVG metrics representation.

---

## 🌟 Key Features

### 1. **Secure & Modern Login Page**
* **Validation & Security**: Built-in validation checks (email formatting, password length rules) with clean real-time error alerts.
* **Remember Me**: Persists the admin email securely in `localStorage` to pre-fill credentials upon return.
* **Animations**: Features moving backdrop blur blobs for an organic and premium visual feel.

### 2. **Interactive Dashboard Overview**
* **Dynamic KPIs**: Real-time calculations for:
  * **Total Orders** (length of orders database)
  * **Total Revenue** (derived from delivered/completed orders)
  * **Active Users** (computed unique clients)
  * **Pending Deliveries** (real-time queue length)
* **Custom SVG Line Chart**: A fully responsive, custom-scaled revenue trends chart featuring gridlines, gradients, and interactive hover tooltips (zero external dependencies, avoiding version conflicts).
* **Recent Orders Table**: 
  * Sort and search orders by Customer name, Order ID, or items.
  * Filter orders by status (All, Pending, Delivered, Cancelled).
  * **Direct Redux Manipulation**: Change order statuses directly in the table dropdown, which immediately updates all KPI cards across the dashboard in real-time.
  * Delete orders with a trash trigger.

### 3. **Product Inventory Management**
* **Catalog Grid**: Displays food inventory items with photos, tags, stock indicators, and availability status.
* **Category Filters**: Filter catalog items on-the-fly using chips (All, Fruits, Vegetables, Dairy, Bakery).
* **Search & Delete**: Fast client-side search by item name, and one-click item deletions.
* **Status Switches**: Interactive slider toggle switches that change availability status between *Available* and *Out of Stock*, automatically syncing stock counts.
* **Direct Stock Editing**: Input field to adjust precise stock numbers in real-time.
* **Add New Product Form**: Opens a beautiful slide-in overlay modal to add a new product (with full input validation).

### 4. **Aesthetics & Performance**
* Clean dark mode theme with Emerald and Mint accents suitable for a fresh, organic harvest portal.
* Highly responsive layouts (Fluid margins, sidebar-to-drawer folding on mobile devices).
* Micro-animations (fade-in pages, scale-up modals, hovering glowing nodes, and input-focus rings).
* Clean separation of concerns with component-specific CSS styling.

---

## 📁 Clean Folder Structure

```
src/
├── assets/             # SVGs, images, static assets
├── components/         # Reusable dashboard components
│   ├── Header.jsx      # Top toolbar with calendar and notification dropdown
│   ├── Header.css      # Header specific styling
│   ├── Sidebar.jsx     # Responsive collapsible navigation panel
│   ├── Sidebar.css     # Sidebar specific styling
│   ├── StatCard.jsx    # Metric visual display card
│   ├── StatCard.css    # StatCard styling
│   ├── LineChart.jsx   # SVG weekly revenue progress chart
│   ├── LineChart.css   # Custom SVG chart animations
│   ├── OrderTable.jsx  # Recent orders data-table with search filters
│   ├── OrderTable.css  # Orders table status dropdown styles
│   ├── Modal.jsx       # Universal slide-in/fade-in modal
│   └── Modal.css       # Backdrop blurs and animations
├── pages/              # Prime layout screens
│   ├── Login.jsx       # Login form with floating labels and validation
│   ├── Login.css       # Glowing moving backdrop blob animations
│   ├── Dashboard.jsx   # Grid of cards, SVG charts, and orders table
│   ├── Dashboard.css   # Dashboard layout grid configurations
│   ├── Products.jsx    # Product cards catalog, filters, and modal triggers
│   └── Products.css    # Card sliders and custom status buttons
├── store/              # Redux Toolkit State Management
│   ├── index.js        # Configures the global store
│   ├── authSlice.js    # Sign-in state and LocalStorage persistence
│   ├── navSlice.js     # Desktop active tab and Mobile sidebar drawer state
│   ├── orderSlice.js   # Customer orders data state (status updates)
│   └── productSlice.js # Food items inventory catalog state
├── App.jsx             # Root layout controller and navigation Router
├── App.css             # Main container spacing offsets
├── index.css           # Design tokens, variables, typography, animations, resets
└── main.jsx            # Application entry point with Redux Provider
```

---

## 🛠️ Tech Stack

* **Core**: React JS
* **State Management**: Redux Toolkit & React-Redux
* **Icons**: Lucide React
* **Styling**: Vanilla CSS (CSS variables, flexbox, grid, glassmorphism, responsive breakpoints)

---

## 🚀 Setup & Installation Instructions

Follow these steps to run the project locally:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 16 or higher is recommended).

### 1. Clone the repository
```bash
git clone https://github.com/ReenaKanwar/urban-harvest.git
cd urban-harvest
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Once started, open your browser and navigate to the local URL (usually `http://localhost:5173/`).

### 4. Create a production build
To test compilation and build the optimized production files in the `/dist` directory, run:
```bash
npm run build
```

---

## 🧑‍💻 Credentials for Testing
You can use any valid email format and a password of 6 or more characters to bypass the secure login screen. 
* **Example Email**: `admin@urbanharvest.com`
* **Example Password**: `admin123`
