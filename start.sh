#!/bin/bash

echo "🚀 Starting Todo List Application..."

# Kill any existing processes
pkill -f "node.*server.js" 2>/dev/null
sleep 1

# Start backend
cd /home/work/local/github/todo_list/backend
node src/server.js &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"

# Wait for backend to be ready
sleep 3

# Start frontend
cd /home/work/local/github/todo_list/frontend
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "📊 Application Status:"
echo "   Backend:  http://0.0.0.0:3001"
echo "   Frontend: http://0.0.0.0:3000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
