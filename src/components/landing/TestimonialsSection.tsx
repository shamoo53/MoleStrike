import { Star, StarHalf } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

interface Testimonial {
  rating: number;
  text: string;
  author: {
    name: string;
    level: number;
    avatarUrl: string;
  };
}

const testimonials: Testimonial[] = [
  {
    rating: 5,
    text: "MoleStrike combines the nostalgic fun of Whack-a-Mole with cutting-edge blockchain technology. I love earning rewards while having fun!",
    author: {
      name: "CryptoGamer",
      level: 17,
      avatarUrl:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoGamer&backgroundColor=1a1a1a",
    },
  },
  {
    rating: 4.5,
    text: "The daily challenges keep me coming back every day. It's addictive knowing that my scores are permanently recorded on the blockchain!",
    author: {
      name: "BlockchainBabe",
      level: 15,
      avatarUrl:
        "https://api.dicebear.com/7.x/lorelei/svg?seed=BlockchainBabe&backgroundColor=1a1a1a",
    },
  },
  {
    rating: 5,
    text: "I've been playing games for years, but MoleStrike is the first one where I actually own my achievements and rewards. The StarkNet integration is seamless!",
    author: {
      name: "TokenKing",
      level: 20,
      avatarUrl:
        "https://api.dicebear.com/7.x/personas/svg?seed=TokenKing&backgroundColor=1a1a1a",
    },
  },
  {
    rating: 5,
    text: "The community is amazing! Everyone is so helpful and the competition is fierce but friendly.",
    author: {
      name: "MoleHunter",
      level: 19,
      avatarUrl:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=MoleHunter&backgroundColor=1a1a1a",
    },
  },
  {
    rating: 4.5,
    text: "Love how the game combines classic arcade fun with modern blockchain rewards. It's addictive!",
    author: {
      name: "ChainMaster",
      level: 16,
      avatarUrl:
        "https://api.dicebear.com/7.x/personas/svg?seed=ChainMaster&backgroundColor=1a1a1a",
    },
  },
];

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-400" />
      ))}
    </div>
  );
};

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#1E1533] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-[#5FE6F4]">
            What Players Say
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Hear from our community of players about their MoleStrike experience.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: "bg-[#5FE6F4] w-8",
              bulletClass:
                "inline-block w-2 h-2 rounded-full bg-gray-600 mx-1 transition-all duration-300 cursor-pointer hover:bg-gray-500",
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper !pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="relative rounded-xl border-2 border-[#5FE6F4] bg-[#1a1a2e] shadow-xl group hover:shadow-2xl hover:shadow-[#5FE6F4]/20 hover:border-[#5FE6F4]/80 transition-all duration-300 h-full">
                  <div className="p-6 h-full flex flex-col">
                    <RatingStars rating={testimonial.rating} />
                    <p className="mt-4 text-gray-300 italic flex-grow">
                      "{testimonial.text}"
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12 border-2 border-[#5FE6F4]/20">
                          <img
                            src={testimonial.author.avatarUrl}
                            alt={testimonial.author.name}
                            className="w-full h-full object-cover"
                          />
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-[#1a1a2e]"></div>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">
                          {testimonial.author.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          Level {testimonial.author.level} Player
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-pagination {
          bottom: 0;
        }
      `}</style>
    </section>
  );
}
