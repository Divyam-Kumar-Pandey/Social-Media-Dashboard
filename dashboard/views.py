from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponseRedirect
from .models import SocialMediaHandle, ScheduledPost
# auth
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

social_media_handles = SocialMediaHandle.objects.all()

# Create your views here.
def summary(request):
    if not request.user.is_authenticated:
        return redirect('/sign-in/')
        pass
    context = {
        'social_media_handles': social_media_handles
    }
    return render(request, 'summary.html', context)

def other(request, pk):
    context = {
        'social_media_handles': social_media_handles,
        'handleName' : pk
    }
    return render(request, 'specific.html', context)

def schedule_post_page(request):
    context = {
        'social_media_handles': social_media_handles,
        'scheduled_posts': ScheduledPost.objects.all(),
    }
    return render(request, 'schedulePost.html', context)

def add_new_handle(request):
    pass

def schedule_post(request):
    if(request.POST):
        handle = request.POST['post-handle']
        handle = SocialMediaHandle.objects.get(name=handle)

        title = request.POST['post-title']
        date = request.POST['post-date']
        time = request.POST['post-time']
        content = request.POST['post-text']
        new_scheduled_post = ScheduledPost(handle=handle, date=date, time=time, content=content, title=title)
        # save the new post
        
        new_scheduled_post.save()
        print(new_scheduled_post)
        # now we need to return the page with the new post
        return redirect('/schedule-post/')
    else:
        return redirect('/schedule-post/')
    
def delete_scheduled_post(request):
    if(request.POST):
        print(request.POST['post-id'])
        toDel = request.POST['post-id']
        post = ScheduledPost.objects.get(id=toDel)
        post.delete()
        return redirect('/schedule-post/')

def edit_scheduled_post(request):
    post = ScheduledPost.objects.get(id=request.GET['post-id'])
    context = {
        'social_media_handles': social_media_handles,
        'post': post
    }
    return render(request, 'editPost.html', context)

def add_new_handle(request):
    return render(request, 'newFeature.html')
    if(request.POST):
        handle = request.POST['new-handle']
        new_handle = SocialMediaHandle(name=handle)
        new_handle.save()
        return redirect('/')
    else:
        return redirect('/')
    

def loginPage(request):
    return render(request, 'newFeature.html')

    context = {
        'errorMessage': '',
    }
    if request.POST :
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            user = None
        
        if user is not None:
            # login the user
            print(user)
            login(request, user)
            return render(request, 'summary.html', {'social_media_handles': social_media_handles})
        else:
            context['errorMessage'] = "Invalid username or password"

    return render(request, 'loginPage.html', context)
    
def signUp(request):
    return render(request, 'newFeature.html')

    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = User.objects.create_user(username, email, password)
        user.save()
        return render(request, 'loginPage.html', {'error': 'You have been registered. Please login.'})
    context = {'errorMessage': 'Please fill out the form.'}
    return render(request, 'registerPage.html', context)
    
def logoutUser(request):
    # logout the user
    logout(request)
    return render(request, 'loginPage.html', {'errorMessage': 'You have been logged out.'})
