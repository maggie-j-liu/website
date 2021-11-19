import Project from "@/components/ProjectCard";
import PageLayout from "@/layouts/PageLayout";
import vidnotes from "@/projects/vidnotes.png";
import cloudlinq from "@/projects/cloudlinq.png";
import reactive from "@/projects/reactive.png";
import stickyNoteWall from "@/projects/sticky-note-wall.png";
import academiaCentral from "@/projects/academia-central.png";
import clearCloset from "@/projects/clear-closet.png";

const Projects = () => {
  return (
    <PageLayout>
      <div className={"max-w-prose mx-auto w-full"}>
        <h1 className={"pt-12 text-4xl font-semibold"}>Projects</h1>
        <div className="mt-4 space-y-12">
          <Project
            url="vidnotes.vercel.app"
            github="vidnotes"
            devpost="vidnotes"
            className={"bg-gradient-to-tr from-pink-50 to-purple-50"}
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
            className={"bg-gradient-to-tr from-blue-100 to-sky-50"}
          >
            <Project.Image src={cloudlinq} />
            <Project.Title>Cloudlinq</Project.Title>
            <Project.Description>
              Share all your profiles from a single link to maximize views of
              your social bio in just one click.
            </Project.Description>
          </Project>
          <Project
            url="reactive-comments.vercel.app"
            github="reactive"
            devpost="reactive-u4c9zf"
            className={"bg-gradient-to-tr from-yellow-50 to-sky-50"}
          >
            <Project.Image src={reactive} />
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
            className={"bg-gradient-to-tr from-indigo-50 to-fuchsia-50"}
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
            className={"bg-gradient-to-tr from-blue-50 to-cyan-50"}
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
            className={"bg-gradient-to-tr from-indigo-50 to-blue-50"}
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
