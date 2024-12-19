import { IconAt, IconBriefcase, IconSchool } from '@tabler/icons-react';
import LineLink from '../components/LineLink';

export default function Page() {
  return (
        <div className="text-2xl">
            <div className="flex items-center gap-x-3 mb-5">
                <p className="text-2xl font-bold text-neutral-800">김동학</p>
                <p className="text-base font-light text-neutral-700">Nest.js, Next.js, C++</p>
            </div>
            <hr />
            <ul className="text-base text-neutral-800 grid gap-y-2 mt-5">
                <li className="flex gap-x-8 items-center">
                    <IconAt stroke={2} className='text-neutral-500' />
                    <p>me@bricn.net</p>
                </li>
                <li className="flex gap-x-8">
                    <IconBriefcase stroke={2} className='text-neutral-500' />
                    <div>
                        <p>동아리 깨소금</p>
                    </div>
                </li>
                <li className="flex gap-x-8">
                    <IconSchool stroke={2} className='text-neutral-500' />
                    <div>
                        <p>광주소프트웨어마이스터고등학교</p>
                        <p>스마트IoT과 재학</p>
                    </div>
                </li>
            </ul>
            <div className='mt-10 grid gap-y-2'>
                <LineLink type='GITHUB' href={'https://github.com/enbraining'}>Github</LineLink>
                <LineLink type='LINKEDIN' href={'https://linkedin.com/in/enbraining'}>LinkedIn</LineLink>
                <LineLink type='SOLVEDAC' href={'https://solved.ac/profile/enbraining'}>Solved.ac</LineLink>
            </div>
        </div>
  );
}