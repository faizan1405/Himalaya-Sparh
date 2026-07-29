import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function AdminRedirectPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/admin/login');
  }
  redirect('/admin/dashboard');
}
