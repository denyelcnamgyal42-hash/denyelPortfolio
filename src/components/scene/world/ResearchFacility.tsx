import { memo } from 'react';
import { CentralPlatform } from './CentralPlatform';
import { LabStation, type Station } from './LabStation';
const stations: Station[] = [
  { label: 'AI LAB', section: 'Research', angle: -0.65, variant: 0 },
  { label: 'PROJECT ARCHIVE', section: 'Projects', angle: 0, variant: 1 },
  { label: 'SECURITY NODE', section: 'Skills', angle: 0.65, variant: 2 },
  { label: 'WORKSTATION', section: 'About', angle: -1.65, variant: 0 },
  { label: 'EXPERIENCE', section: 'Experience', angle: 2.65, variant: 2 },
  { label: 'COMMUNICATIONS', section: 'Contact', angle: 1.65, variant: 0 },
];
export const ResearchFacility = memo(function ResearchFacility() {
  return (
    <group>
      <CentralPlatform />
      {stations.map((station) => (
        <LabStation key={station.label} {...station} />
      ))}
    </group>
  );
});
