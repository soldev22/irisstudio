// ✅ Server Component — allowed to export metadata
import AboutContent from './AboutContent';

export const metadata = {
  title: 'About Us | Iris Infinity Studio',
  description:
    'Learn more about Iris Infinity Studio — the UK-based team behind our stunning iris photography and cosmic art prints.',
};

export default function AboutPage() {
  return <AboutContent />;
}
