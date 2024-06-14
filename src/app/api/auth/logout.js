import { signOut } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await signOut({ callbackUrl: '/' });
      res.status(200).json({ message: '로그아웃 성공' });
    } catch (error) {
      console.error('로그아웃 중 에러 발생:', error);
      res.status(500).json({ message: '로그아웃 실패' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}