'use client';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import FilterManufacturer from './FilterManufacturer';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

export default function Filter() {
  const router = useRouter();
  const [manufacturer, setManufacturer] = useState('0');
  const [search, setSearch] = useState('');
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setManufacturer(searchParams.get('manufacturer') || '0');
    setSearch(searchParams.get('search') || '');
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filter</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <FilterManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className='w-full' />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={() => {
                const searchParams = [];
                if (manufacturer && manufacturer !== '0') searchParams.push(`manufacturer=${manufacturer}`);
                if (search) searchParams.push(`search=${search}`);
                if (manufacturer || search) router.push(window.location.pathname + `?${searchParams.join('&')}`);
              }}
            >
              Apply
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              onClick={() => {
                router.push(window.location.pathname);
                setManufacturer('');
              }}
            >
              Reset
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
