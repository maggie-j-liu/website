import Project from "@/components/ProjectCard";
import PageLayout from "@/layouts/PageLayout";
import vidnotes from "@/projects/vidnotes.png";
import cloudlinq from "@/projects/cloudlinq.png";
import reactive from "@/projects/reactive.png";
import reactiveDark from "@/projects/reactive-dark.png";
import reactiveComments from "@/projects/reactive-comments.png";
import stickyNoteWall from "@/projects/sticky-note-wall.png";
import academiaCentral from "@/projects/academia-central.png";
import clearCloset from "@/projects/clear-closet.png";
import practiceParrot from "@/projects/practice-parrot.png";
import browserPets from "@/projects/browser-pets.png";
import cardCreator from "@/projects/card-creator.png";
import GitHub from "@/components/GitHub";

const Projects = () => {
  return (
    <PageLayout>
      <div className={"max-w-prose mx-auto w-full"}>
        <h1 className={"pt-12 text-4xl font-semibold"}>Projects</h1>
        <div className="mt-4 space-y-12">
          <Project
            github="browser-pets"
            devpost="browser-pets"
            className={
              "bg-gradient-to-tr from-gray-100 to-blue-100 dark:from-gray-700 dark:to-blue-900"
            }
          >
            <Project.Image src={browserPets} />
            <Project.Title>Browser Pets</Project.Title>
            <Project.Description>
              Browser Pets is a Chrome extension that adds customizable pixel
              art pets and a realtime chat to your browser, in order to create
              an entertaining browsing experience. You are able to customize
              your avatar/pet by creating a custom pixel art, you can customize
              your username that's shown to all online users and you can chat
              with the other users.
            </Project.Description>
          </Project>
          <Project
            url="practice-parrot.vercel.app"
            github="practice-parrot"
            devpost="practice-parrot"
            className={
              "bg-gradient-to-tr from-cyan-100 to-fuchsia-200 dark:from-cyan-600 dark:to-fuchsia-500"
            }
          >
            <Project.Image src={practiceParrot} />
            <Project.Title>Practice Parrot</Project.Title>
            <Project.Description>
              Practice Parrot is a website that makes practicing more fun for
              classical musicians. Users are able to start practice sessions to
              practice with a color changing practice parrot, have their
              practice times tracked, and compete with other users to see who
              practiced the most.
            </Project.Description>
          </Project>
          <Project
            github="card-creator"
            className={
              "bg-gradient-to-tr from-red-100 to-green-100 dark:from-red-900 dark:to-green-900"
            }
          >
            <Project.Image src={cardCreator} />
            <Project.Title>Card Creator</Project.Title>
            <Project.Description>
              <p>
                Card Creator is a platform where people can create and share
                digital holiday cards with anyone anywhere in the world! Every
                holiday season, the postal service becomes inundated with mail
                that there are holiday shipping delays across the continent. To
                send holiday greetings to friends and family more reliably,
                people can use Card Creator!
              </p>
              <p>
                Built with <GitHub>arashnrim</GitHub>, <GitHub>eilla1</GitHub>{" "}
                and <GitHub>pranavnt</GitHub>
              </p>
            </Project.Description>
          </Project>
          <Project
            url="vidnotes.vercel.app"
            github="vidnotes"
            devpost="vidnotes"
            className={
              "bg-gradient-to-tr from-pink-50 dark:from-pink-800 to-purple-50 dark:to-purple-800"
            }
          >
            <Project.Image src={vidnotes} />
            <Project.Title>VidNotes</Project.Title>
            <Project.Description>
              VidNotes is a website that provides a notetaking overlay for a
              video, allowing you to take notes more efficiently.
            </Project.Description>
          </Project>
          <Project
            url="cloudlinq.co"
            github="cloudlinq"
            devpost="cloudlinq"
            className={
              "bg-gradient-to-tr from-blue-100 dark:from-blue-800 to-sky-50 dark:to-sky-800"
            }
          >
            <Project.Image src={cloudlinq} />
            <Project.Title>Cloudlinq</Project.Title>
            <Project.Description>
              Share all your profiles from a single link to maximize views of
              your social bio in just one click.
            </Project.Description>
          </Project>
          <Project
            url={[
              "reactive-comments.vercel.app",
              "reactive-comments-docs.vercel.app",
            ]}
            github={["reactive", "reactive-docs"]}
            devpost="reactive-u4c9zf"
            className={
              "bg-gradient-to-tr from-yellow-50 dark:from-yellow-800 to-sky-50 dark:to-sky-800"
            }
          >
            <div className="grid grid-rows-2 grid-cols-5 place-items-center">
              <div className="col-span-3 row-span-2 ">
                <Project.Image src={reactive} />
              </div>
              <div className="col-span-2 row-span-1">
                <Project.Image src={reactiveDark} />
              </div>
              <div className="col-span-2 row-span-1">
                <Project.Image src={reactiveComments} />
              </div>
            </div>
            <Project.Title>Reactive</Project.Title>
            <Project.Description>
              A javascript widget that makes it easy to add a comments and
              reactions system to your website. It's being used on this site!
            </Project.Description>
          </Project>
          <Project
            url="stickynotewall.vercel.app"
            github="sticky-notes"
            devpost="sticky-note-wall"
            className={
              "bg-gradient-to-tr from-indigo-50 dark:from-indigo-800 to-fuchsia-50 dark:to-fuchsia-800"
            }
          >
            <Project.Image src={stickyNoteWall} />
            <Project.Title>Sticky Note Wall</Project.Title>
            <Project.Description>
              Add sticky notes to manage your todo list, store ideas for future
              reference and connect with others!
            </Project.Description>
          </Project>
          <Project
            url="academia-central.vercel.app"
            github="academia-central"
            devpost="academia-central"
            className={
              "bg-gradient-to-tr from-blue-50 dark:from-blue-800 to-cyan-50 dark:to-cyan-800"
            }
          >
            <Project.Image src={academiaCentral} />
            <Project.Title>Academia Central</Project.Title>
            <Project.Description>
              Academia Central is a website that facilitates academic programs’
              outreach. It allows organizers to add their event to the website,
              and allows students to easily search for events that interest
              them.
            </Project.Description>
          </Project>
          <Project
            url="clear-closet.vercel.app"
            github="closet-app"
            devpost="clear-closet"
            className={
              "bg-gradient-to-tr from-indigo-50 dark:from-indigo-800 to-blue-50 dark:to-blue-800"
            }
          >
            <Project.Image src={clearCloset} />
            <Project.Title>Clear Closet</Project.Title>
            <Project.Description>
              Clear Closet is a useful tool to upload, save, and search your
              clothes. Upload images of your clothes, get accurate tags from AI
              and search your closet for specific tags.
            </Project.Description>
          </Project>
        </div>
      </div>
    </PageLayout>
  );
};
export default Projects;
