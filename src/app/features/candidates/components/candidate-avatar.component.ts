import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InitialsPipe } from '../pipes/initials.pipe';

@Component({
  selector: 'app-candidate-avatar',
  imports: [InitialsPipe, NgClass],
  templateUrl: './candidate-avatar.html',
  standalone: true,
})
export class CandidateAvatar {
  @Input() name = '';
  @Input() avatar = '';
  @Input() showAvatar = true;
  @Input() size: 20 | 32 = 32;

  @Output() avatarError = new EventEmitter<void>();

  get avatarSizeClass() {
    return this.size === 32 ? 'w-32 h-32' : 'w-20 h-20';
  }

  get initialsSizeClass() {
    return this.size === 32 ? 'text-5xl' : 'text-3xl';
  }
}
