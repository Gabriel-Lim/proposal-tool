'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    supabase.from('project').select('*').then(({ data }) => setProjects(data || []));
  }, []);

  async function createProject() {
    if (!name) return;
    const { data } = await supabase.from('project').insert({ name }).select();
    setProjects((p) => [...p, ...(data || [])]);
    setName('');
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Projects</h1>
      <div className="mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
          placeholder="New project name"
        />
        <button onClick={createProject} className="btn btn-secondary">Create</button>
      </div>
      <ul className="list-disc pl-6">
        {projects.map((p) => <li key={p.id}>{p.name}</li>)}
      </ul>
    </main>
  );
}
