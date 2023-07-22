const AppLayoutGeneral = ({ children }) => {
  return (
    <>
      <div className="container__toneox1">{children}</div>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
          background: transparent
            linear-gradient(241deg, #941832 0%, #65111f 100%) 0% 0% no-repeat
            padding-box;
          height: 100vh;
          overflow: hidden;
        }
        __next {
          height: 100vh;
        }
        .container__toneox1 {
          display: grid;
          grid-template-columns: 1fr 3fr;
          grid-template-rows: 100px 1000px;
          grid-template-areas:
            "nav header"
            "nav main";
        }
        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }

        main::-webkit-scrollbar {
          -webkit-appearance: none;
        }

        main::-webkit-scrollbar:vertical {
          width: 10px;
        }

        main::-webkit-scrollbar-button:increment,
        main::-webkit-scrollbar-button {
          display: none;
        }

        main::-webkit-scrollbar:horizontal {
          height: 10px;
        }

        main::-webkit-scrollbar-thumb {
          background-color: #4c0c17;
          border-radius: 20px;
        }
        main::-webkit-scrollbar-thumb:hover {
          background-color: #400b14;
        }

        main::-webkit-scrollbar-thumb:active {
          background-color: #30080f;
        }

        main::-webkit-scrollbar-track {
          border-radius: 10px;
        }

        @media (max-width: 1024px) {
          body {
            background: #e7e7de;
          }
          .container__toneox1 {
            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: 60px 80vh 80px;
            grid-template-areas:
              "header"
              "main"
              "nav";
          }
        }
      `}</style>
    </>
  );
};

export { AppLayoutGeneral };
