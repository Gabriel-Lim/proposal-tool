// App Router example – redirect to login
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');        // or return some landing markup
}