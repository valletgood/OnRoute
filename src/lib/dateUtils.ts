import { format, parseISO, formatDistanceToNow, isToday, isYesterday, isThisYear } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * ISO 8601 형식의 날짜 문자열을 파싱
 * @param dateString - ISO 8601 형식의 날짜 문자열 (예: "2025-11-04T18:10:49.000+09:00")
 * @returns Date 객체 또는 null
 */
export function parseDate(dateString: string): Date | null {
  try {
    return parseISO(dateString);
  } catch {
    return null;
  }
}

/**
 * 날짜를 보기 좋은 형식으로 포맷팅
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @param formatType - 포맷 타입 ('full' | 'date' | 'time' | 'datetime' | 'relative')
 * @returns 포맷된 날짜 문자열
 */
export function formatDate(
  dateString: string,
  formatType: 'full' | 'date' | 'time' | 'datetime' | 'relative' = 'datetime',
): string {
  const date = parseDate(dateString);
  if (!date) return dateString;

  switch (formatType) {
    case 'full':
      // 2025년 11월 4일 18시 10분
      return format(date, 'yyyy년 MM월 dd일 HH시 mm분', { locale: ko });

    case 'date':
      // 2025년 11월 4일
      if (isToday(date)) {
        return '오늘';
      }
      if (isYesterday(date)) {
        return '어제';
      }
      if (isThisYear(date)) {
        return format(date, 'MM월 dd일', { locale: ko });
      }
      return format(date, 'yyyy년 MM월 dd일', { locale: ko });

    case 'time':
      // 18:10
      return format(date, 'HH:mm', { locale: ko });

    case 'datetime':
      // 2025년 11월 4일 18:10
      if (isToday(date)) {
        return `오늘 ${format(date, 'HH:mm', { locale: ko })}`;
      }
      if (isYesterday(date)) {
        return `어제 ${format(date, 'HH:mm', { locale: ko })}`;
      }
      if (isThisYear(date)) {
        return format(date, 'MM월 dd일 HH:mm', { locale: ko });
      }
      return format(date, 'yyyy년 MM월 dd일 HH:mm', { locale: ko });

    case 'relative':
      // 2시간 전, 3일 전 등
      return formatDistanceToNow(date, { addSuffix: true, locale: ko });

    default:
      return format(date, 'yyyy년 MM월 dd일 HH:mm', { locale: ko });
  }
}

/**
 * 날짜와 시간을 분리해서 반환
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns { date: string, time: string }
 */
export function formatDateTime(dateString: string): { date: string; time: string } {
  const date = parseDate(dateString);
  if (!date) {
    const [datePart, timePart] = dateString.split('T');
    return {
      date: datePart || dateString,
      time: timePart?.substring(0, 5) || '',
    };
  }

  if (isToday(date)) {
    return {
      date: '오늘',
      time: format(date, 'HH:mm', { locale: ko }),
    };
  }

  if (isYesterday(date)) {
    return {
      date: '어제',
      time: format(date, 'HH:mm', { locale: ko }),
    };
  }

  if (isThisYear(date)) {
    return {
      date: format(date, 'MM월 dd일', { locale: ko }),
      time: format(date, 'HH:mm', { locale: ko }),
    };
  }

  return {
    date: format(date, 'yyyy년 MM월 dd일', { locale: ko }),
    time: format(date, 'HH:mm', { locale: ko }),
  };
}
