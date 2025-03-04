import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Card, Button } from "react-bootstrap";

const blogPosts = [
  {
    id: 1,
    title: "The Secrets to a Living Room that Draws You In",
    category: "FURNITURE, TABLE",
    date: "JAN 9, 2025",
    description:
      "Nunc ut sem ut ex sollicitudin commodo. Suspendisse non enim felis. Nam nec diam ultricies, malesuada",
    image: "/lamp.png",
    authorImage: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    title: "Modern Chairs to Elevate Your Space",
    category: "CHAIRS, DESIGN",
    date: "JAN 9, 2025",
    description:
      "Explore the best chairs for a modern look. Elevate your interior design with our top picks.",
    image: "/tv_table.png",
    authorImage: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    title: "Best Tables for Small Spaces",
    category: "TABLES, INTERIOR",
    date: "FEB 15, 2025",
    description:
      "Discover the best tables for small spaces that maximize functionality and style.",
    image: "/wardrove.png",
    authorImage: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

export default function BlogSwiper() {
  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold">OUR BLOG</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1.2}
        breakpoints={{
          768: { slidesPerView: 1 },
        }}
      >
        {blogPosts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="position-relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-100 rounded"
                  />
                  <span className="position-absolute top-0 start-0 bg-white text-dark px-3 py-1 m-2 fw-bold">
                    {post.date}
                  </span>
                  <span className="position-absolute bottom-0 start-0  text-dark px-3 py-1 m-2 fw-bold">
                    <div className="mt-3 d-flex align-items-center">
                      <img
                        src={post.authorImage}
                        alt="Author"
                        className="rounded-circle me-2"
                        width="60"
                        height="60"
                        style={{ border: " 8px solid #eeeeee70" }}
                      />
                      <span className="fw-bold">Author</span>
                    </div>
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <Card className="border-0">
                  <Card.Body>
                    <Card.Subtitle className="text-muted text-uppercase small">
                      {post.category}
                    </Card.Subtitle>
                    <Card.Title className="fw-bold mt-2">
                      {post.title}
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {post.description}
                    </Card.Text>
                    <Button variant="dark" className="fw-bold">
                      READ MORE
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
