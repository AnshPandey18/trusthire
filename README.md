# TrustHire - Contract Management Platform

A modern web application for creating and managing contracts, built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- User authentication
- Contract creation and management
- Responsive design
- Modern UI with animations
- Secure API integration

## Tech Stack

- **Frontend**:
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Axios

- **Backend**:
  - FastAPI (Python)
  - PostgreSQL
  - JWT Authentication

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+ (for backend)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trusthire.git
cd trusthire
```

2. Install frontend dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

## Project Structure

```
trusthire/
├── components/         # Reusable React components
│   ├── layout/        # Layout components
│   └── ui/            # UI components
├── pages/             # Next.js pages
│   ├── api/          # API routes
│   └── contract/     # Contract-related pages
├── styles/           # Global styles and Tailwind config
├── public/           # Static assets
└── backend/          # FastAPI backend (separate repository)
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for the beautiful animations 