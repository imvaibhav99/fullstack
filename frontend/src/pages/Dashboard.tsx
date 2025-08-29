// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface User {
//   name: string;
//   email: string;
//   dob: string;
// }

// interface Note {
//   _id: string;
//   title: string;
//   content: string;
// }

// const Dashboard: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [editId, setEditId] = useState<string | null>(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) return;
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//     const fetchData = async () => {
//       try {
//         const userRes = await axios.get('http://localhost:5001/api/auth/user');
//         setUser(userRes.data);
//         const notesRes = await axios.get('http://localhost:5001/api/notes');
//         setNotes(notesRes.data);
//       } catch (err: any) {
//         setError('Failed to load data');
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async () => {
//     setError('');
//     if (!title || !content) return setError('Title and content required');
//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5001/api/notes/${editId}`, { title, content });
//         setEditId(null);
//       } else {
//         await axios.post('http://localhost:5001/api/notes', { title, content });
//       }
//       const res = await axios.get('http://localhost:5001/api/notes');
//       setNotes(res.data);
//       setTitle('');
//       setContent('');
//     } catch (err: any) {
//       setError(err.response?.data?.msg || 'Operation failed');
//     }
//   };

//   const handleEdit = (note: Note) => {
//     setTitle(note.title);
//     setContent(note.content);
//     setEditId(note._id);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`http://localhost:5001/api/notes/${id}`);
//       setNotes(notes.filter((n) => n._id !== id));
//     } catch (err: any) {
//       setError('Delete failed');
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="dashboard">
//       <h1>Welcome, {user.name}</h1>
//       <p>Email: {user.email}</p>
//       <p>DOB: {new Date(user.dob).toLocaleDateString()}</p>
//       <h2>Your Notes</h2>
//       <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
//       <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
//       <button onClick={handleSubmit}>{editId ? 'Update' : 'Create'} Note</button>
//       {error && <p className="error">{error}</p>}
//       <ul>
//         {notes.map((note) => (
//           <li key={note._id}>
//             <h3>{note.title}</h3>
//             <p>{note.content}</p>
//             <button onClick={() => handleEdit(note)}>Edit</button>
//             <button onClick={() => handleDelete(note._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  dob: string;
}

interface Note {
  _id: string;
  title: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchData = async () => {
      try {
        const userRes = await axios.get('http://localhost:5001/api/auth/user');
        setUser(userRes.data);
        const notesRes = await axios.get('http://localhost:5001/api/notes');
        setNotes(notesRes.data);
      } catch (err: any) {
        setError('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    setError('');
    if (!title || !content) return setError('Title and content required');
    try {
      if (editId) {
        await axios.put(`http://localhost:5001/api/notes/${editId}`, { title, content });
        setEditId(null);
      } else {
        await axios.post('http://localhost:5001/api/notes', { title, content });
      }
      const res = await axios.get('http://localhost:5001/api/notes');
      setNotes(res.data);
      setTitle('');
      setContent('');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Operation failed');
    }
  };

  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err: any) {
      setError('Delete failed');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-topbar">
        <div className="dashboard-top-left">
          <img src="/assets/top2.png" alt="Logo" className="dashboard-logo" />
          <h1 className="dashboard-title">Dashboard</h1>
        </div>
        <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
      </div>

      <div className="dashboard-userinfo">
        <p><strong>Welcome, {user.name}</strong></p>
        <p>Email: {user.email}</p>
        <p>DOB: {new Date(user.dob).toLocaleDateString()}</p>
      </div>

      <h2>Your Notes</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="blue-btn" onClick={handleSubmit}>{editId ? 'Update' : 'Create'} Note</button>
      {error && <p className="error">{error}</p>}

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button className="blue-btn" onClick={() => handleEdit(note)}>Edit</button>
            <button className="blue-btn" onClick={() => handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
