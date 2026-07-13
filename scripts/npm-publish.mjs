import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const packageJson = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
)
const rawForwardedArgs = process.argv.slice(2)
const forwardedArgs =
  rawForwardedArgs[0] === '--' ? rawForwardedArgs.slice(1) : rawForwardedArgs

const npmArgs = [
  '--cache',
  './.npm-cache',
  '--registry',
  'https://registry.npmjs.org/',
  'publish',
]

const explicitTag = forwardedArgs.some(
  (arg) => arg === '--tag' || arg.startsWith('--tag='),
)
const prereleaseTag = getPrereleaseTag(packageJson.version)

if (prereleaseTag && !explicitTag) {
  npmArgs.push('--tag', prereleaseTag)
  console.log(
    `Publishing prerelease ${packageJson.version} with npm dist-tag "${prereleaseTag}".`,
  )
} else {
  console.log(
    `Publishing ${packageJson.version}${explicitTag ? ' with explicit npm dist-tag' : ''}.`,
  )
}

npmArgs.push(...forwardedArgs)

const result = spawnSync('npm', npmArgs, { stdio: 'inherit' })

if (result.error) {
  console.error(result.error.message)
  process.exit(1)
}

process.exit(result.status ?? 1)

function getPrereleaseTag(version) {
  const prerelease = version.match(/-([0-9A-Za-z.-]+)(?:\+.*)?$/)?.[1]

  if (!prerelease) {
    return undefined
  }

  const preid = prerelease.split('.').find((part) => /[A-Za-z]/.test(part))

  return preid && /^[A-Za-z][A-Za-z0-9._-]*$/.test(preid) ? preid : 'next'
}
