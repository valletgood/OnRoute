export interface CourierCompany {
  value: string;
  label: string;
}

export const COURIER_COMPANIES: CourierCompany[] = [
  { value: 'kr.cjlogistics', label: 'CJ대한통운' },
  { value: 'kr.lotte', label: '롯데택배' },
  { value: 'kr.logen', label: '로젠택배' },
  { value: 'kr.hanjin', label: '한진택배' },
  { value: 'kr.epost', label: '우체국택배' },
  { value: 'kr.cupost', label: 'CU 편의점택배' },
  { value: 'kr.cvsnet', label: 'GS Postbox' },
  { value: 'kr.coupangls', label: '쿠팡 로지스틱스 서비스' },
  { value: 'kr.chunilps', label: '천일택배' },
  { value: 'kr.epost.ems', label: '우체국택배 국제우편 (EMS)' },
  { value: 'kr.ilyanglogis', label: '일양로지스' },
  { value: 'kr.kdexp', label: '경동택배' },
  { value: 'kr.lotte.global', label: '롯데택배 (국제택배)' },
];
