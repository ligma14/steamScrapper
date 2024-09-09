# SteamScrapper

SteamScrapper is a web application designed to fetch and display data from Steam, with a focus on Counter-Strike 2 items and cases. This project serves as a playground for practicing and showcasing my web development skills.

## Features

- **Steam Data Scraping**: Utilizes Cheerio and Axiom to parse and extract data from Steam's website.
- **Item Display**: Presents Steam items and CS2 cases in an intuitive and visually appealing manner.
- **Search Functionality**: Allows users to search for specific items or cases.
- **Responsive Design**: Ensures a seamless experience across various devices and screen sizes.
- **Animations**: Incorporates smooth animations using GSAP for an enhanced user experience.
- **Data Visualization**: (Planned) Implement charts and graphs to represent item trends and statistics.
- **Database integraation**: Integrated a Supabase database to store and manage scraped data efficiently.
- **NodeMailer**: (Planned) Implement email functionality to send notifications to users.
- **Cron Jobs**: Implemented cron jobs to automate regular data updates. 

## Technology Stack

### Frontend
- **NextJS**: React framework for building the user interface
- **Tailwind CSS**: Utility-first CSS framework for styling
- **GSAP**: Library for creating high-performance animations
- **Framer Motion**: Animation library for React
- **Aceternity UI**: Component library for sleek UI elements

### Backend (Work in Progress)
- **Node.js**: JavaScript runtime for the server-side logic
- **Cheerio**: Library for parsing and manipulating HTML
- **Axiom**: HTTP client for making requests to Steam's website

### Planned Additions
- **NodeMailer**: For implementing email functionality
- **Item comparison tool**: For comparing the prices of items across different markets.
- **Price history tracking**: For tracking the price history of items over time.
- **Steam inventory integration**: For displaying the user's Steam inventory and allowing them to view the price of their items.
- **Community features**: Allow users to share items and discuss prices in the community.
- **Authentication**: Implement a secure login system for users to access additional features.
- **Market arbitrage finder**: For finding items that are underpriced on the Steam market and items that are overpriced.
- **Data export**: Allow users to export data to a CSV file for analysis in other tools.


## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/steam-scrapper.git
   cd steam-scrapper
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

The project is currently deployed on Vercel. You can view the live version at:
[https://steam-scrapper.vercel.app/](https://steam-scrapper.vercel.app/)

## Contributing

Contributions are welcome! If you have ideas for new features or improvements, feel free to:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Feel free to contant me at eugenecoop12@gmail.com

Project Link: [https://github.com/ligma14/steam-scrapper](https://github.com/ligma14/steam-scrapper)

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/)
- [Vercel](https://vercel.com/)

## Links

Vercel-app:
https://steam-scrapper.vercel.app/


## Installation

Make sure to install all the dependencies

`> npm install`

`> npm run dev`