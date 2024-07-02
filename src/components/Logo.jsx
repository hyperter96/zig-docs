import Image from 'next/image'

export function Logo() {
  return (
    <div className="hidden min-w-full items-center gap-2 lg:flex">
      <Image src="/logo.svg" alt="Logo" width={30} height={30} />
      <span className="text-xl font-semibold dark:text-white">Zig</span>
    </div>
  )
}
