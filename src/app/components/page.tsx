import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <section>
        <Button>Click Me</Button>
        <Button variant={"outline"}>Click Me</Button>
      </section>

      <section>
        <div className="">
          <h1>Heading One</h1>
          <h2>Heading Two</h2>
          <h3>Heading Three</h3>
          <h4>Heading Four</h4>
          <h5>Heading Five</h5>
          <h6>Heading Six</h6>
          <p>Body - Regular</p>
          <small>Body - Small</small>
          <span>Caption</span>
        </div>
      </section>
    </main>
  );
}
