import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Team from "@/public/svg/about/team.svg";
import Goal from "@/public/svg/about/goal.svg";
import Body from "@/public/svg/about/body.svg";
import Hype from "@/public/svg/about/hype.svg";
import Medal from "@/public/svg/about/medal.svg";
import Mountain from "@/public/svg/about/mountain.svg";
import Face from "@/public/svg/about/face.svg";
import Pose from "@/public/svg/about/pose.svg";
import Alish from "@/public/svg/about/ali.sh.svg";
import Alis from "@/public/svg/about/ali.s.svg";
import Naeem from "@/public/svg/about/naeem.svg";
import Sit from "@/public/svg/about/sit.svg";
import Button from "@/components/Button";


export default function AboutPage() {
  return (
    <div className="m-auto min-h-screen max-w-[500px] relative">
      <Header />

      <main className="w-full bg-white">
        <section className="pt-8 text-center">
          <div className="my-20">
            <h1 className="text-4xl font-bold text-neutral-darker">
              ما کی هستیم؟
            </h1>

            <p className="mt-5 text-lg font-bold text-neutral-darker">
              جیمیوو یک تیم دغدغه مند
            </p>

            <div className="mt-6 flex justify-center">
              <Image
                src={Team}
                alt="Gymivo team"
                width={260}
                height={180}
                priority
              />
            </div>

            <p className="text-lg font-bold leading-7 text-black px-10 pt-7">
              ما یک تیم کوچک از آدم‌هایی هستیم که به ورزش علاقه داریم و دوست داریم تمرین کردن رو ساده‌تر کنیم.
            </p>
          </div>

        <div className="relative px-5 flex justify-end -my-14">
          <Image
            src={Goal}
            alt="Gymivo goal"
            width={119}
            height={117}
          />
        </div>

          <section className="bg-primary-100 p-5">
            <h2 className="text-[24px] font-bold py-3 text-neutral-darker text-right">
              هدفمون چیه؟
            </h2>

            <p className="text-sm leading-6 text-black text-right">
              تجربه ما نشان داد تمرین آنلاین با ابزارهای پراکنده، هم برای مربی زمان‌بر است و هم برای ورزشکار گیج‌کننده. ما تصمیم گرفتیم یک راهکار اختصاصی برای تمرین واقعی و پیگیری درست بسازیم.
            </p>
          </section>
        </section>

        <section className="px-4 py-10 bg-white">
          <h2 className="text-center text-2xl font-bold text-neutral-darker mb-6">
            مسیر پیش رو
          </h2>

          <div className="flex justify-end mb-8">
            <Image
              src={Mountain}
              alt="mountain"
              width={280}
              height={220}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-3 bg-[#C9F3DD] px-4 py-3 rounded-xl self-start">
              <Image src={Hype} alt="hype" width={24} height={24} />
              <p className="text-lg text-neutral-darker font-extrabold">
                وقتشه کم کم ورزشو بیاریم تو خونه!
              </p>
            </div>

            <div className="inline-flex items-center gap-3 bg-primary-100 px-4 py-3 rounded-xl self-end">
              <Image src={Face} alt="face" width={24} height={24} />
              <p className="text-lg text-neutral-darker font-extrabold">
                برای رژیمت انگیزه نداری؟ اون با ما
              </p>
            </div>

            <div className="inline-flex items-center gap-3 bg-[#C9F3DD] px-4 py-3 rounded-xl self-start">
              <Image src={Medal} alt="medal" width={24} height={24} />
              <p className="text-lg text-neutral-darker font-extrabold">
                رفیق منتظر چالش های خفنمون باش
              </p>
            </div>

            <div className="inline-flex items-center gap-3 bg-primary-100 px-4 py-3 rounded-xl self-end">
              <Image src={Body} alt="body" width={20} height={20} />
              <p className="text-lg text-neutral-darker font-extrabold">
                بدنت رو دقیق آنالیز کن و نگران چیزی نباش
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 bg-white">
          <h2 className="text-center text-2xl font-bold text-neutral-darker mb-8">
            با تیم ما آشنا شو
          </h2>

          <div className="flex px-5 justify-between gap-4">
            <div className="flex flex-col justify-around gap-6 flex-1">
              <div className="flex flex-col items-center text-center">
                <Image
                  src={Naeem}
                  alt="team member"
                  width={120}
                  height={120}
                  className="rounded-2xl"
                />
                <p className="mt-3 font-bold text-sm text-neutral-darker">
                  محمد نعیم کریم‌زاده
                </p>
                <p className="text-xs text-neutral-500">
                  بنیان‌گذار و طراح جیمیوو
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Image
                  src={Alis}
                  alt="team member"
                  width={120}
                  height={120}
                  className="rounded-2xl"
                />
                <p className="mt-3 font-bold text-sm text-neutral-darker">
                  علی سلیمانی
                </p>
                <p className="text-xs text-neutral-500">
                  توسعه‌دهنده بک‌اند
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6 flex-1">
              <div className="flex flex-col items-center text-center">
                <Image
                  src={Pose}
                  alt="team member"
                  width={100}
                  height={100}
                  className="rounded-2xl"
                />
              </div>

              <div className="flex flex-col items-center text-center">
                <Image
                  src={Alish}
                  alt="team member"
                  width={120}
                  height={120}
                  className="rounded-2xl"
                />
                <p className="mt-3 font-bold text-sm text-neutral-darker">
                  علی شیخ بهایی
                </p>
                <p className="text-xs text-neutral-500">
                  توسعه‌دهنده فرانت‌اند
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Image
                  src={Sit}
                  alt="team member"
                  width={100}
                  height={100}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 bg-[#F3FCF7] px-5 py-6 text-center">
            <p className="text-sm text-neutral-darker mb-4">
              <strong>نظر شما برای ما مهمه</strong>
              <br />
               اگر پیشنهادی داری، خوشحال می‌شیم ازت بشنویم.
            </p>

            <div className="flex items-center justify-center p-2">
              <Button variant="primary" size="md">
                ارسال پیام
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
