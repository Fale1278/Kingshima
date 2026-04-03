import React from 'react';
import Section from './Section';
import GlassCard from './GlassCard';
import styles from './Team.module.css';

const team = [
  { name: "Fale King Nanmua", role: "Visionary Founder/CEO", image: "https://mail.google.com/mail/u/0?ui=2&ik=41979ff655&attid=0.1&permmsgid=msg-a:r8625286833678417167&th=19d502fe25d0f341&view=fimg&fur=ip&permmsgid=msg-a:r8625286833678417167&sz=s0-l75-ft&attbid=ANGjdJ_rMdRS3OyFIr3Fa5_MPZNsrwIkSIjtkffo1cggS59VeieZyRfZqkKyZrt2KGIy2DPQrKFpiaDce3s_vRadcrGqtx9lEIoWRNpmrvngByQR9Awio3l_xTrsLhk&disp=emb&realattid=ii_19d502fcb201bb215e91&zw" },
  { name: "Joy John", role: "Operations and Programs Lead", image: "https://scontent.fabb1-1.fna.fbcdn.net/v/t39.30808-6/611250378_122317263014032851_7729269670744204964_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeH0G7-73NBDy7Hav-W1dPESFoNV1tFSuHwWg1XW0VK4fM5redQV5fnojDOPJj-n9Rph7j3m8daCc-pSMsKB4mLp&_nc_ohc=-Wc8mbtZlN8Q7kNvwFzkiKs&_nc_oc=AdoSl-jMxLPszN8Dyc4NHstkuC2qfF-eKmG8qfJ9j5hp1s3uH3j-f7nrKfjekj0AeZs&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&_nc_gid=8HDDYPU8-N-fqITxrhv_Dw&_nc_ss=7a3a8&oh=00_Af07pyB4zoFQl8Xgv8kp_xr2VYsqvBJZvndrOyHGJJB8YQ&oe=69D4C1E9" },
  { name: "Nanbyen Miri", role: "Media and Communications Lead", image: "https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/480445820_666723935924018_4255426090122603914_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeGqo8J7JtmKpxCy9xYu3-vJvTSu66EbffK9NK7roRt98mkMaM5e89fH-X80_wOzD5Hj7uGaQHc4UzLjSqLq7r8g&_nc_ohc=QLdX2IVs-5MQ7kNvwEigN6L&_nc_oc=AdphHyVB-amufL3XpME1m3DaUSLVlfSmhWXNNf2v72ozGJdknehEBynljXkPP6_X8VA&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&_nc_gid=eOPR1B29kpr0sOnt0fIFig&_nc_ss=7a3a8&oh=00_Af3RllQTeuStW_3r5-GiRGlPoBI3i_oo3rWd5HSUF2Zxxg&oe=69D4C3AE" },
  { name: "Nanjip Moses", role: "Community & Foundation Adviser", image: "https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/480445820_666723935924018_4255426090122603914_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeGqo8J7JtmKpxCy9xYu3-vJvTSu66EbffK9NK7roRt98mkMaM5e89fH-X80_wOzD5Hj7uGaQHc4UzLjSqLq7r8g&_nc_ohc=QLdX2IVs-5MQ7kNvwEigN6L&_nc_oc=AdphHyVB-amufL3XpME1m3DaUSLVlfSmhWXNNf2v72ozGJdknehEBynljXkPP6_X8VA&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&_nc_gid=eOPR1B29kpr0sOnt0fIFig&_nc_ss=7a3a8&oh=00_Af3RllQTeuStW_3r5-GiRGlPoBI3i_oo3rWd5HSUF2Zxxg&oe=69D4C3AE" }

];

const Team = () => {
  return (
    <Section id="team">
      <div className={styles.header}>
        <h2 className={styles.title}>Leadership & Mentorship</h2>
        <p className={styles.subtitle}>Guided by experience and deeply committed to your growth and purpose.</p>
      </div>
      <div className={styles.grid}>
        {team.map((member, index) => (
          <GlassCard key={index} delay={index * 150} className={styles.memberCard}>
            <div className={styles.imageWrapper}>
              <img src={member.image} alt={member.name} className={styles.image} />
            </div>
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.role}>{member.role}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
};

export default Team;
