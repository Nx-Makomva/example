# Running Brightside on your laptop

This guide shows you how to run the app and the design system on your own machine. You can then see your change before anyone else does. Your AI assistant can do all of this for you. In Claude Code, type `/preview-locally`. But it helps to know what is happening, and to be able to do it yourself.

> **"Local"** means running on your laptop. Nobody else can see it. It is safe to break things here.

---

## One-time setup

You do this once on each laptop.

### 1. Install the tools

| Tool | Why you need it | Check that it works |
| --- | --- | --- |
| [Node.js](https://nodejs.org) 24 or newer (the repo uses 26, see `.nvmrc`) | Runs the app | `node -v` shows `v24` or higher |
| [pnpm](https://pnpm.io/installation) | Installs the project's packages | `pnpm -v` shows a version |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Runs the screenshot tests in the same way on every laptop | Docker Desktop is open, and `docker info` shows no error |
| [GitHub CLI](https://cli.github.com/) | Lets your assistant open pull requests for you | `gh auth status` shows that you are logged in |

### 2. Get the code and install it

```bash
git clone https://github.com/Nx-Makomva/example.git brightside
cd brightside
pnpm install                             # downloads packages and turns on the pre-push hook
pnpm exec playwright install chromium    # the browser that the tests use
```

---

## Every time you start work

```bash
git switch main
git pull
pnpm install    # only does something if a teammate added a package
```

Or ask your assistant: *"start a new change"*. The `start-change` skill does these steps and creates your branch.

---

## Seeing your change

There are two places to look. Use both.

### The app: what teachers and students see

```bash
pnpm dev
```

Open **http://localhost:3000**.

| Page | Who uses it | URL |
| --- | --- | --- |
| Class overview | Teachers | http://localhost:3000 |
| Morning check-in | Students | http://localhost:3000/check-in |

When you save a file, the page updates by itself. You do not need to refresh.

### Storybook: every component, in every state

```bash
pnpm storybook
```

Open **http://localhost:6006**. Every component is in the sidebar. Each story shows one state, for example *Empty*, *Disabled* or *Long text*.

The panels at the bottom of Storybook:

- **Controls:** change a component's props live. For example, type a very long name to see if it breaks the layout.
- **Accessibility:** lists problems such as low colour contrast. Anything here fails the checks when you push.

While Storybook runs, your AI assistant can also read the component list through its MCP server.

### To stop

Press **Ctrl + C** in the terminal where it is running.

---

## How to check a change yourself

Do these checks before you open a pull request. They catch most of the problems that a reviewer would find.

1. **Phone size.** In Chrome, press **Cmd + Option + I** (Mac) or **Ctrl + Shift + I** (Windows) and select the phone icon. Try a width of 390 px and 320 px. Students often check in on a phone.
2. **Keyboard only.** Put the mouse away. Press **Tab** to move through the page and **Enter** or **Space** to activate. Can you reach everything? Can you always see where the focus is?
3. **The awkward states.** Look at the stories for the empty state, a very long name, and an error. Real data is messier than sample data.
4. **Zoom.** Zoom the browser to 200% (**Cmd +** or **Ctrl +**). Does the text still fit?
5. **Side effects.** If you changed `globals.css` or a component in `src/components/ui/`, look at every page. Those files affect everything.

Then ask your assistant to run `/design-review`. It takes screenshots of what you changed and checks them against the rules.

---

## Running the checks yourself

These are the same checks that run when you push (`/finish-work` runs them all for you):

| Command | What it checks | About how long |
| --- | --- | --- |
| `pnpm lint` | Off-system styles and code errors | 10 s |
| `pnpm typecheck` | Code that does not fit together | 10 s |
| `pnpm test:stories` | Every story renders and passes accessibility | 20 s |
| `pnpm test:visual:docker` | Every story matches its approved screenshot (Docker must be running) | 1–2 min |

After `pnpm test:visual:docker`, open `playwright-report/index.html` in your browser. It shows each change as *expected*, *actual* and *diff*. See *Visual changes* in [CONTRIBUTING.md](CONTRIBUTING.md) for how to approve them.

---

## When something goes wrong

| What you see | What it means | What to do |
| --- | --- | --- |
| `command not found: pnpm` | pnpm is not installed | Install it (see the setup above), then open a new terminal |
| `Port 3000 is in use` | The app is already running in another terminal | Use that one, or stop it with Ctrl + C first |
| A Storybook **Docs** page is blank | Storybook's cache is out of date, often after a `git pull` | Stop Storybook with Ctrl + C, run `pnpm storybook` again, and refresh the page |
| `Cannot find module …` after a `git pull` | A teammate added a package | Run `pnpm install` |
| `Cannot connect to the Docker daemon` | Docker Desktop is not open | Open Docker Desktop, wait for it to start, then try again |
| The page does not show your change | The wrong branch, or the file was not saved | Run `git branch --show-current`, and save the file |
| The push is blocked by the checks | The pre-push hook found a problem | Ask your assistant to run `/finish-work`. Fix the problem. Do not skip the hook. |

If you are stuck, paste the whole error message to your assistant. Ask it to *"explain this in plain English before you fix it"*.
