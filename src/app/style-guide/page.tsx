import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col space-y-8 py-12">
      <section id="colors" className="flex flex-col space-y-5">
        <h1>Colors</h1>
        <span className="rounded-lg text-center p-5 max-w-72 border bg-primary">Color primary</span>
        <span className="rounded-lg text-center p-5 max-w-72 border bg-destructive">Color error</span>
        <span className="rounded-lg text-center p-5 max-w-72 border bg-background">Color background</span>
        <span className="rounded-lg text-center p-5 max-w-72 border bg-card">Color card</span>
        <span className="rounded-lg text-center p-5 max-w-72 border bg-input">Color input</span>
      </section>
      <hr />
      <section id="components">
        <h1>Components</h1>
        <div>
          <h2>Buttons</h2>
          <div className="flex flex-wrap gap-gutter">
            <Button>Click Me</Button>
            <Button variant={"outline"}>Click Me</Button>
          </div>
        </div>
        <div>
          <h2>Inputs</h2>
          <div className="flex flex-wrap gap-gutter">
            <Input />
            <Input type="email" defaultValue={"wrong email"} />
          </div>
        </div>
      </section>

      <hr />

      <section id="typography">
        <h1>Typography</h1>
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
      <hr />
      <section id="grid">
        <h1>Grid</h1>
        <div className="grid grid-cols-12 gap-gutter">
          <div className="bg-primary flex justify-center items-center h-12 text-primary-foreground">1</div>
          <div className="bg-primary flex justify-center items-center h-12 text-primary-foreground">2</div>
          <div className="bg-primary flex justify-center items-center h-12 text-primary-foreground">3</div>
          <div className="bg-primary flex justify-center items-center h-12 text-primary-foreground">4</div>
          <div className="bg-primary flex justify-center items-center h-12 text-primary-foreground">5</div>
          <div className="bg-primary flex justify-center items-center h-12 text-primary-foreground">6</div>
          <div className="bg-primary flex justify-center items-center h-12 text-primary-foreground">7</div>
          <div className="bg-primary flex justify-center items-center h-12 text-primary-foreground">8</div>
          <div className="bg-primary flex justify-center items-center h-12 text-primary-foreground">9</div>
          <div className="bg-primary flex justify-center items-center h-12 text-primary-foreground">10</div>
          <div className="bg-primary flex justify-center items-center h-12 text-primary-foreground">11</div>
          <div className="bg-primary flex justify-center items-center h-12 text-primary-foreground">12</div>
        </div>
      </section>
    </main>
  );
}
