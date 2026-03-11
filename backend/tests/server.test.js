const axios = require('axios');

const API_URL = 'http://localhost:3001/api/todos';

describe('Todo API', () => {
  let createdTodoId;

  afterAll(async () => {
    // Cleanup: delete test todo
    try {
      await axios.delete(`${API_URL}/${createdTodoId}`);
    } catch (e) {
      // Ignore cleanup errors
    }
  });

  test('should get all todos', async () => {
    const response = await axios.get(API_URL);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('should create a new todo', async () => {
    const response = await axios.post(API_URL, {
      title: 'Test Todo',
      description: 'This is a test',
      priority: 'high'
    });
    expect(response.status).toBe(201);
    expect(response.data.title).toBe('Test Todo');
    expect(response.data.status).toBe('todo');
    createdTodoId = response.data.id;
  });

  test('should get a single todo', async () => {
    const response = await axios.get(`${API_URL}/${createdTodoId}`);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(createdTodoId);
  });

  test('should update a todo', async () => {
    const response = await axios.put(`${API_URL}/${createdTodoId}`, {
      status: 'inprogress',
      priority: 'medium'
    });
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('inprogress');
    expect(response.data.priority).toBe('medium');
  });

  test('should return 404 for non-existent todo', async () => {
    try {
      await axios.get(`${API_URL}/999999`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});

describe('Health Check', () => {
  test('should return healthy status', async () => {
    const response = await axios.get('http://localhost:3001/health');
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('ok');
    expect(response.data.timestamp).toBeDefined();
  });
});
