# Simple React Node App with Nx

Most Nx commands follow the same pattern. Learning this will be helpful.

## Quick Steps

This is the instructions with no explanation. See below for relevant extras.

- `npx create-nx-workspace@latest`
- `cd WHATEVER_YOU_NAMED_IT`
- `yarn add -D @nx/react @nx/node`
- `yarn nx g @nx/node:application --name=BACKEND_NAME  --e2eTestRunner=none`
- `yarn nx g @nx/react:application FRONT_END_NAME --e2eTestRunner=none`
- Setup cors on the API
- Make requests

## Workspace

**Command:** `npx create-nx-workspace@latest`

You can pass `—packageManeger yarn`, but in my experience, this has no effect and will still use `npm`

It will ask you a series of questions:

| Question                                                            | Answer                                                                                                                                   |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Where would you like to create your workspace?                      | Name you org whatever you want. This will influence your import paths, the `@` in `@org/SOME_PACKAGE`. It will also be your folder name. |
| Which stack do you want to use?                                     | None                                                                                                                                     |
| Package-based monorepo, integrated monorepo, or standalone project? | Integrated Monorepo                                                                                                                      |
| Enable distributed caching to make your CI faster                   | Your call                                                                                                                                |

**Command:** `cd WHATEVER_YOU_NAMED_IT`

## Node App

**Command:** `yarn nx g @nx/node:application --name=BACKEND_NAME  --e2eTestRunner=none`

I add e2e none, because it makes another folder called `BACKEND_NAME-e2e` and it’s just noise to me. You can keep it if you want.

| Question                            | Answer    |
| ----------------------------------- | --------- |
| Which framework do you want to use? | Your call |

Add the applicable cors to your API. This will vary from package to package.

## React App

**Command:** `yarn nx g @nx/react:application FRONT_END_NAME --e2eTestRunner=none`

| Question                                                   | Answer                                                                                                      |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Which stylesheet format would you like to use?             | Your call                                                                                                   |
| Would you like to add React Router to this application?    | Your call                                                                                                   |
| Which bundler do you want to use to build the application? | Your call, there are some differences, but I am a fan of Vite. Their web pack config does support `swc` tho |

## Connecting

Ensure you have setup cors.

By default the UI will be on localhost:4200, and the API will be on localhost:3000. You can change these if you want.

**Command:** `yarn nx run-many --parallel --target=serve --projects=web,api`

This will run the back end and front end at the same time, if you want it to. Up to you. You can run each individually of course, if you'd prefer.

## Extras

### Type Check

If you are using TypeScript, which you probably are, a huge missing piece of Nx is the ability to type check packages. There's a 3rd party package I have found lots of success with, `@webpro/tsc`

Add this to any `target` key in a `project.json`.

```json
{
  "targets": {
    "type-check": {
      "executor": "@webpro/nx-tsc:tsc",
      "options": {
        "tsConfig": ["tsconfig.app.json"] // <---- This could also be `tsconfig.json`, or `tsconfig.lib.json` depending on your project.
      }
    }
  }
}
```

The `tsConfig` option is important here. You need to target the one for the running code, not the root one. For whatever reason, if you leave this out, it will skip the type check and just report everything is fine. Idk why, it just does. Probably something to do with the unorthodox setup of many tsconfigs.

I have added them to each, web and api.

### Controlling where apps and packages go

If you want to control where the packages go and where the apps go, add this to your [nx.json](./nx.json). You can of course change the names of the destinations.

```json
{
  "workspaceLayout": {
    "appsDir": "apps",
    "libsDir": "packages"
  }
}
```
