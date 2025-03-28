import NavBar from "../components/Navbar";


function Profile() {
  return (
    <div>
    <section className="section py-[100px] relative bg-[#f5f5f5] text-[#6F8BA4]" id="about">
      <NavBar />
      <div className="container mx-auto">
        {/* About Me Row */}
        <div className="flex flex-row-reverse items-center">
          {/* About Text */}
          <div className="lg:w-1/2">
            <div className="about-text">
              <h3 className="text-[#20247b] text-[45px] font-bold mb-[6px] md:text-[35px]">
                About Me
              </h3>
              <h6 className="text-[#fc5356] font-semibold mb-[15px] text-lg md:text-[18px]">
                A Lead UX & UI designer based in Canada
              </h6>
              <p className="text-[18px] max-w-[450px]">
                I <mark className="font-semibold text-[#20247b] bg-gradient-to-r from-[rgba(252,83,86,0.6)] to-[rgba(252,83,86,0.6)] bg-[length:100%_3px] bg-no-repeat bg-bottom">design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.
              </p>
              <div className="flex flex-wrap pt-[10px]">
                <div className="md:w-1/2">
                  <div className="flex items-center py-[5px]">
                    <label className="text-[#20247b] font-semibold w-[88px] relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-[11px] after:w-[1px] after:h-[12px] after:bg-[#20247b] after:rotate-[15deg] after:opacity-50">
                      Birthday
                    </label>
                    <p className="m-0 text-[15px]">4th April 1998</p>
                  </div>
                  <div className="flex items-center py-[5px]">
                    <label className="text-[#20247b] font-semibold w-[88px] relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-[11px] after:w-[1px] after:h-[12px] after:bg-[#20247b] after:rotate-[15deg] after:opacity-50">
                      Age
                    </label>
                    <p className="m-0 text-[15px]">22 Yr</p>
                  </div>
                  <div className="flex items-center py-[5px]">
                    <label className="text-[#20247b] font-semibold w-[88px] relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-[11px] after:w-[1px] after:h-[12px] after:bg-[#20247b] after:rotate-[15deg] after:opacity-50">
                      Residence
                    </label>
                    <p className="m-0 text-[15px]">Canada</p>
                  </div>
                  <div className="flex items-center py-[5px]">
                    <label className="text-[#20247b] font-semibold w-[88px] relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-[11px] after:w-[1px] after:h-[12px] after:bg-[#20247b] after:rotate-[15deg] after:opacity-50">
                      Address
                    </label>
                    <p className="m-0 text-[15px]">California, USA</p>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center py-[5px]">
                    <label className="text-[#20247b] font-semibold w-[88px] relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-[11px] after:w-[1px] after:h-[12px] after:bg-[#20247b] after:rotate-[15deg] after:opacity-50">
                      E-mail
                    </label>
                    <p className="m-0 text-[15px]">info@domain.com</p>
                  </div>
                  <div className="flex items-center py-[5px]">
                    <label className="text-[#20247b] font-semibold w-[88px] relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-[11px] after:w-[1px] after:h-[12px] after:bg-[#20247b] after:rotate-[15deg] after:opacity-50">
                      Phone
                    </label>
                    <p className="m-0 text-[15px]">820-885-3321</p>
                  </div>
                  <div className="flex items-center py-[5px]">
                    <label className="text-[#20247b] font-semibold w-[88px] relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-[11px] after:w-[1px] after:h-[12px] after:bg-[#20247b] after:rotate-[15deg] after:opacity-50">
                      Skype
                    </label>
                    <p className="m-0 text-[15px]">skype.0404</p>
                  </div>
                  <div className="flex items-center py-[5px]">
                    <label className="text-[#20247b] font-semibold w-[88px] relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-[11px] after:w-[1px] after:h-[12px] after:bg-[#20247b] after:rotate-[15deg] after:opacity-50">
                      Freelance
                    </label>
                    <p className="m-0 text-[15px]">Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* About Avatar */}
          <div className="lg:w-1/2 md:mt-[30px]">
            <div className="about-avatar">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt=""
                className="max-w-full align-middle border-none"
              />
            </div>
          </div>
        </div>

        {/* Counter Section */}
        <div className="mt-8 p-[22px_20px] bg-white rounded-lg shadow-[0_0_30px_rgba(31,45,61,0.125)]">
          <div className="flex flex-wrap">
            <div className="w-1/2 lg:w-1/4">
              <div className="text-center my-[10px]">
                <h6 className="text-[#20247b] font-bold text-2xl mb-[5px]">500</h6>
                <p className="m-0 font-semibold">Happy Clients</p>
              </div>
            </div>
            <div className="w-1/2 lg:w-1/4">
              <div className="text-center my-[10px]">
                <h6 className="text-[#20247b] font-bold text-2xl mb-[5px]">150</h6>
                <p className="m-0 font-semibold">Project Completed</p>
              </div>
            </div>
            <div className="w-1/2 lg:w-1/4">
              <div className="text-center my-[10px]">
                <h6 className="text-[#20247b] font-bold text-2xl mb-[5px]">850</h6>
                <p className="m-0 font-semibold">Photo Capture</p>
              </div>
            </div>
            <div className="w-1/2 lg:w-1/4">
              <div className="text-center my-[10px]">
                <h6 className="text-[#20247b] font-bold text-2xl mb-[5px]">190</h6>
                <p className="m-0 font-semibold">Telephonic Talk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Profile;