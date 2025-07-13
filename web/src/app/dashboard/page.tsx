'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import UploadArea from '@/components/UploadArea';   // ← add this line

type Project = { id: string; name: string };

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');

  // fetch once after login
  useEffect(() => {
    supabase.from('project').select('id, name').then(({ data }) => {
      if (data) setProjects(data);
    });
  }, []);

  async function createProject() {
    if (!name) return;
    const { data } = await supabase
      .from('project')
      .insert({ name })
      .select();
    if (data) setProjects((prev) => [...prev, ...data]);
    setName('');
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="mb-6 text-3xl font-semibold">Projects</h1>

      {/* new-project form */}
      <div className="mb-8 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New project name"
          className="flex-1 rounded border p-2"
        />
        <button onClick={createProject} className="rounded bg-blue-600 px-4 py-2 text-white">
          Create
        </button>
      </div>

      {/* list of projects with uploader */}
      <ul className="space-y-6">
        {projects.map((p) => (
          <li key={p.id} className="rounded border p-4">
            <div className="font-medium">{p.name}</div>
            {/* ← here’s the uploader for this project */}
            <UploadArea projectId={p.id} />
          </li>
        ))}
      </ul>
    </main>
  );
}