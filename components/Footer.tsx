import Link from "next/link";
import Image from "next/image";
import gymivoIcon from "@/public/svg/footer/gymivo.svg";
import FrameIcon from "@/public/svg/footer/picture-frame.svg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';

export default function Footer() {
  return (
    <div className="bg-neutral-darker">
      <div className="px-5 pt-10">
        <Image src={gymivoIcon} alt="gimivo" width={120} height={50} />
      </div>

      <div className="flex justify-between">
        <div className="p-5 flex flex-col">
          <h2 className="py-4 font-bold">
            صفحات <span className="text-primary-300">جیمیوو</span>
          </h2>
          <Link className="hover:underline" href="/about"><p>درباره ما</p></Link>
          <Link className="hover:underline" href="/contact"><p>ارتباط با ما</p></Link>
          <Link className="hover:underline" href="/terms"><p>قوانین و مقررات</p></Link>
          <Link className="hover:underline" href="/faq"><p>سوالات متداول</p></Link>
          <Link className="hover:underline" href="/cooperate"><p>همکاری با جیمیوو</p></Link>
        </div>

        <div className="p-5 flex flex-col">
          <h2 className="py-4 font-bold">
            خدمات <span className="text-primary-300">جیمیوو</span>
          </h2>
          <Link className="hover:underline" href="/myprograms"><p>برنامه های من</p></Link>
          <Link className="hover:underline" href="/movements"><p>جستجوی حرکات</p></Link>
          <Link className="hover:underline" href="/createprogram"><p>ساخت برنامه شخصی</p></Link>
          <Link className="hover:underline" href="/coaches"><p>جستجوی مربیان</p></Link>
        </div>
      </div>

      <div className="p-5">
        <h2 className="font-bold">فضای مجازی</h2>
          <div className="flex gap-3 justify-end">
            <WhatsAppIcon style={{ fontSize: 40 }} />
            <EmailIcon style={{ fontSize: 40 }} />
            <TelegramIcon style={{ fontSize: 40 }} />
            <InstagramIcon style={{ fontSize: 40 }} />
          </div>
      </div>

      <div className="p-5">
        <h2 className="font-bold">نمادها</h2>
        <div className="py-5 flex justify-between">
          <CropOriginalIcon style={{ fontSize: 80 }} />
          <CropOriginalIcon style={{ fontSize: 80 }} />
          <CropOriginalIcon style={{ fontSize: 80 }} />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <p className="py-5 text-sm">
          در این سایت سعی شده است سادگی کار حفظ شود.
        </p>
      </div>
    </div>
  );
}
