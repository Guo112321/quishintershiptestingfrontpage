import { redirect } from 'next/navigation';

export default function UserIndexRedirect() {
  redirect('/user/1');
}
