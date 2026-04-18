const Icon = ({ d, size = 16, stroke = 1.75, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
);

export const IconHome = (p) => <Icon {...p}><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></Icon>;
export const IconDumbbell = (p) => <Icon {...p}>
  <path d="M3 10v4"/><path d="M7 7v10"/><path d="M7 12h10"/><path d="M17 7v10"/><path d="M21 10v4"/>
</Icon>;
export const IconCalendar = (p) => <Icon {...p}>
  <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 3v4"/><path d="M16 3v4"/>
</Icon>;
export const IconChart = (p) => <Icon {...p}><path d="M3 20V4"/><path d="M3 20h18"/><path d="M7 16V11"/><path d="M12 16V7"/><path d="M17 16v-6"/></Icon>;
export const IconLibrary = (p) => <Icon {...p}><path d="M4 4h6v16H4z"/><path d="M10 4h10v16H10z"/><path d="M14 8h3"/><path d="M14 12h3"/></Icon>;
export const IconPlus = (p) => <Icon {...p}><path d="M12 5v14"/><path d="M5 12h14"/></Icon>;
export const IconCheck = (p) => <Icon {...p}><path d="M4 12l5 5L20 6"/></Icon>;
export const IconX = (p) => <Icon {...p}><path d="M5 5l14 14"/><path d="M19 5L5 19"/></Icon>;
export const IconMore = (p) => <Icon {...p}><circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/></Icon>;
export const IconSearch = (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></Icon>;
export const IconTimer = (p) => <Icon {...p}><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2"/><path d="M9 2h6"/></Icon>;
export const IconPlay = (p) => <Icon {...p}><path d="M7 4v16l13-8z" fill="currentColor"/></Icon>;
export const IconPause = (p) => <Icon {...p}><path d="M7 4h4v16H7z" fill="currentColor" stroke="none"/><path d="M13 4h4v16h-4z" fill="currentColor" stroke="none"/></Icon>;
export const IconFlame = (p) => <Icon {...p}><path d="M12 3c2 4 6 6 6 11a6 6 0 0 1-12 0c0-2 1-3 2-4 0 2 1 3 2 3-1-3 1-6 2-10z"/></Icon>;
export const IconTrophy = (p) => <Icon {...p}><path d="M8 4h8v4a4 4 0 0 1-8 0V4z"/><path d="M8 6H5v2a3 3 0 0 0 3 3"/><path d="M16 6h3v2a3 3 0 0 1-3 3"/><path d="M10 14v3H8v2h8v-2h-2v-3"/></Icon>;
export const IconCog = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2 1.2L10 21h4l.6-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/></Icon>;
