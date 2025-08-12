import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useLanguage } from '../contexts/LanguageContext';
import Navigation from './Navigation';
import '../assets/user.css'

const UserProfile = ({ isMobile = false }) => {
  const { t } = useLanguage();
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const clerkUser = {
      id: user.id,
      username: user.fullName || user.username || user.firstName,
      email: user.emailAddresses[0]?.emailAddress || '',
      avatar: user.imageUrl || '/icon.jpg',
      joinDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '',
      location: user.primaryAddress?.city || 'Unknown',
      bio: user.publicMetadata?.bio || 'No biography available yet.',
      level: user.publicMetadata?.level || 1,
      experience: user.publicMetadata?.experience || 0,
      nextLevelExp: user.publicMetadata?.nextLevelExp || 100,
      badges: user.publicMetadata?.badges || [],
      stats: user.publicMetadata?.stats || {
        totalObservations: 0,
        verifiedObservations: 0,
        speciesIdentified: 0,
        contributions: 0,
        accuracy: 0,
        monthlyObservations: Array(12).fill(0)
      },
      recentObservations: user.publicMetadata?.recentObservations || [],
      achievements: user.publicMetadata?.achievements || []
    };

    setProfile(clerkUser);
    setIsLoading(false);
  }, [user]);

  if (!user || isLoading) {
    return <div style={{ padding: 20, textAlign: 'center', color: '#888' }}>{t('common.loading')}...</div>;
  }

  return (
    <div className='all' style={{ padding: 0 }}>
                <Navigation />
                <div className="userr">
      <h2>{profile.username}</h2>
      <img className='imggg' src={profile.avatar} alt="Avatar" width={100} style={{ borderRadius: '50%' }} />
      <p>{profile.bio}</p>
      <p>{t('Email  ')}: {profile.email}</p>
      <p>{t('Locaiton  ')}: {profile.location}</p>
      <p>{t('Date of Joining  ')}: {profile.joinDate}</p>
      {/* Diğer alanları buraya ekle */}</div>
    </div>
  );
};

export default UserProfile;