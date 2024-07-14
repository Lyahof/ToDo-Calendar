//'https://isdayoff.ru/api/getdata?year=YYYY&month=MM[&cc=xx&pre=[0|1]&delimeter=%0A&covid=[0|1]&sd=[0|1]]'
const API = 'https://isdayoff.ru/api/getdata';
const PROXY_URL = 'https://api.allorigins.win/get?url=';

const formatMonth = (month: number): string => {
	return month < 10 ? `0${month}` : `${month}`;
 };

export default async function getDaysOff(year: number, month: number): Promise<boolean[]> {
	const formattedMonth = formatMonth(month)
  	const response = await fetch(`${PROXY_URL}${encodeURIComponent(`${API}?year=${year}&month=${formattedMonth}`)}`);
  	if (!response.ok) {
    	throw new Error('Failed to fetch data from API');
  	}
  	const data = await response.json();
	return data.contents.split('').map((day: string) => day === '1')
}