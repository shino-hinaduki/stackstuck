import { Location } from './location';
import { Progress } from './progress';
import { Strategy } from './strategy';
import { Structure } from './structure';

/** Construction Project */
export class Project {
    /** Build structure */
    structure: Structure;
    /** Build strategy */
    strategy: Strategy;
    /** Building location */
    location: Location;
    /** Building progress */
    progress: Progress;
}
