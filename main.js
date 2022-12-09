(()=>{"use strict";const e=e=>{let t=[];return{name:e,addTask:function(e,n,c,i){let o=((e,t,n,c,i=!1)=>({title:e,description:t,dueDate:n,priority:c,complete:i}))(e,n,c,i);t.push(o)},delTask:function(e){t.splice(e,1)},toggleTaskCompletion:function(e){let n=t[e];n.complete=!1===n.complete},getTasks:()=>t}};(()=>{let t=(()=>{let t=[],n=e("Default");return t.push(n),{createProject:function(n){let c=e(n);t.push(c)},switchActiveProject:function(e){n=e},delProject:function(e){t[e]!==n&&t.splice(e,1)},getActiveProject:()=>n,getProjects:()=>t}})(),n=document.querySelector(".projects"),c=document.querySelector(".add-project-input"),i=document.querySelector(".add-project-btn"),o=document.querySelector(".add-task-btn"),d=document.querySelector(".overlay"),a=document.querySelectorAll(".close-modal"),l=document.querySelector("#task-name"),r=document.querySelector("#date"),s=document.querySelector("#priority"),u=document.querySelector("#description");function m(){!function(){for(let e=n.rows.length-1;e>=0;e--)n.deleteRow(e)}(),t.getProjects().forEach(((e,t)=>{let c=n.insertRow(t),i=document.createElement("button");i.onclick=p,i.innerText=e.name,i.dataset.indexNumber=t;let o=document.createElement("button");o.onclick=f,o.innerText="x",c.appendChild(i),c.appendChild(o)})),function(){let e=t.getActiveProject();t.getProjects().forEach(((t,n)=>{t.name===e.name&&document.querySelector(`[data-index-number="${n}"]`).classList.add("active")}))}()}function p(){t.switchActiveProject(t.getProjects()[this.dataset.indexNumber]),m(),k()}function v(){let e=c.value.trim();""===e||function(e){let n=t.getProjects(),c=!1;return n.forEach((t=>{e!==t.name||(c=!0)})),c}(e)||(t.createProject(e),m(),g([c]))}function f(){t.delProject(this.previousElementSibling.dataset.indexNumber),m()}function k(){let e=document.querySelector(".active-project-header"),n=t.getActiveProject();e.innerText=n.name,document.querySelector(".tasks").innerHTML="",function(){let e=t.getActiveProject(),n=document.querySelector(".tasks");e.getTasks().forEach(((e,t)=>{let c=document.createElement("div");c.classList.add("task");let i=document.createElement("div");i.classList.add("task-main");let o=document.createElement("button");o.onclick=E,o.classList.add("complete-task-btn"),e.complete&&o.classList.add("complete"),o.dataset.indexNumber=t;let d=document.createElement("h3");d.innerText=e.title,d.dataset.modal="edit",d.dataset.indexNumber=t,d.onclick=j;let a=document.createElement("button");a.classList.add("del-task-btn"),a.innerText="x",a.dataset.indexNumber=t,a.onclick=y;let l=document.createElement("div");l.classList.add("task-info");let r=document.createElement("div");r.classList.add("task-misc");let s=document.createElement("p");s.innerText=e.priority;let u=document.createElement("p");u.innerText=e.dueDate,r.appendChild(s),r.appendChild(u),l.appendChild(d),l.appendChild(r),i.appendChild(l),i.appendChild(a),c.appendChild(o),c.appendChild(i),n.appendChild(c)}))}()}function h(){let e=function(){let e=l.value,t=r.value,n=s.value,c=u.value;return g([l,r,s,u]),{title:`${e}`,description:`${c}`,dueDate:t,priority:`${n}`}}();t.getActiveProject().addTask(e.title,e.description,e.dueDate,e.priority),k(),L()}function y(){t.getActiveProject().delTask(this.dataset.indexNumber),k()}function E(){let e=this.dataset.indexNumber;this.classList.contains("complete")?this.classList.remove("complete"):this.classList.add("complete"),t.getActiveProject().toggleTaskCompletion(e)}function g(e){e.forEach((e=>{e.value=""}))}function x(){document.querySelector(".modal").classList.add("on"),d.classList.add("on")}function L(){document.querySelector(".modal").classList.remove("on"),d.classList.remove("on")}function j(){let e=document.querySelector(".modal-title"),n=this.dataset.indexNumber;e.innerText="Edit Task";let c=document.querySelector(".submit");c.innerText="Confirm Changes",c.dataset.indexNumber=n,c.removeEventListener("click",h),c.addEventListener("click",T),x(),function(e){let n=t.getActiveProject().getTasks()[e];l.value=n.title,r.value=n.dueDate,s.value=n.priority,u.value=n.description}(n)}function T(){let e=t.getActiveProject().getTasks()[+this.dataset.indexNumber];e.title=l.value,e.description=u.value,e.dueDate=r.value,e.priority=s.value,k(),L()}i.addEventListener("click",v),c.addEventListener("keyup",(function(e){13===e.keyCode&&(e.preventDefault(),v())})),o.addEventListener("click",(function(){document.querySelector(".modal-title").innerText="Add Task";let e=document.querySelector(".submit");e.innerText="Add",e.removeEventListener("click",T),e.addEventListener("click",h),g([l,r,s,u]),x()})),d.addEventListener("click",L),a.forEach((e=>{e.addEventListener("click",L)})),m(),k()})()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TUFDcENwRCxFQUFLVCxRQUFVK0IsRUFBVThCLE1BQ3pCcEQsRUFBS1IsU0FBVytCLEVBQWtCNkIsTUFFbENILElBQ0FpQyxHQUNGLENBelBBbEUsRUFBaUIyRSxpQkFBaUIsUUFBU3pDLEdBQzNDbkMsRUFBZ0I0RSxpQkFBaUIsU0FpRmpDLFNBQTZCRyxHQUNMLEtBQWxCQSxFQUFNQyxVQUNSRCxFQUFNRSxpQkFDTjlDLElBRUosSUFuRkFqQyxFQUFjMEUsaUJBQWlCLFNBbU4vQixXQUNtQjlFLFNBQVNDLGNBQWMsZ0JBQzdCeUIsVUFBWSxXQUN2QixJQUFJa0QsRUFBZTVFLFNBQVNDLGNBQWMsV0FDMUMyRSxFQUFhbEQsVUFBWSxNQUN6QmtELEVBQWFDLG9CQUFvQixRQUFTRSxHQUMxQ0gsRUFBYUUsaUJBQWlCLFFBQVNoQixHQUN2Q25CLEVBQWtCLENBQUNuQyxFQUFlQyxFQUFXQyxFQUFtQkMsSUFDaEUrRCxHQUNGLElBM05BckUsRUFBYXlFLGlCQUFpQixRQUFTVCxHQUN2Qy9ELEVBQWtCWSxTQUFTa0UsSUFDekJBLEVBQU9OLGlCQUFpQixRQUFTVCxFQUFXLElBNlA5Q3pELElBQ0F3QixHQUFXLEVFbFJiLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvc2NyZWVuQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvYXBwQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRhc2sgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGU9ZmFsc2UpID0+IHtcblxuICByZXR1cm4ge1xuICAgIHRpdGxlLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGR1ZURhdGUsXG4gICAgcHJpb3JpdHksXG4gICAgY29tcGxldGVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB0YXNrIiwiaW1wb3J0IHRhc2sgZnJvbSAnLi90YXNrLmpzJ1xuXG5jb25zdCBwcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgbGV0IHRhc2tzID0gW11cblxuICBmdW5jdGlvbiBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICBsZXQgbmV3VGFzayA9IHRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSlcbiAgICB0YXNrcy5wdXNoKG5ld1Rhc2spXG4gIH1cblxuICBmdW5jdGlvbiBkZWxUYXNrKGluZGV4KSB7XG4gICAgdGFza3Muc3BsaWNlKGluZGV4LCAxKVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlVGFza0NvbXBsZXRpb24oaW5kZXgpIHtcbiAgICBsZXQgdGFzayA9IHRhc2tzW2luZGV4XVxuICAgIHRhc2suY29tcGxldGUgPSB0YXNrLmNvbXBsZXRlID09PSBmYWxzZSA/IHRydWUgOiBmYWxzZVxuICB9XG5cbiAgY29uc3QgZ2V0VGFza3MgPSAoKSA9PiB0YXNrc1xuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBhZGRUYXNrLFxuICAgIGRlbFRhc2ssXG4gICAgdG9nZ2xlVGFza0NvbXBsZXRpb24sXG4gICAgZ2V0VGFza3NcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0IiwiaW1wb3J0IGFwcENvbnRyb2xsZXIgZnJvbSBcIi4vYXBwQ29udHJvbGxlci5qc1wiXG5cbmNvbnN0IHNjcmVlbkNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gIGxldCBhcHAgPSBhcHBDb250cm9sbGVyKClcblxuICAvL2NhY2hlIERPTVxuICBsZXQgcHJvamVjdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cycpXG4gIGxldCBhZGRQcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtaW5wdXQnKVxuICBsZXQgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1idG4nKVxuICBsZXQgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1idG4nKVxuICBsZXQgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKVxuICBsZXQgY2xvc2VNb2RhbEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xvc2UtbW9kYWwnKVxuICBsZXQgdGFza05hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLW5hbWUnKVxuICBsZXQgZGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKVxuICBsZXQgdGFza1ByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKVxuICBsZXQgZGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpXG5cbiAgLy9iaW5kIGV2ZW50c1xuICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2FkZFByb2plY3QpXG4gIGFkZFByb2plY3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIF9zdWJtaXRQcm9qZWN0SW5wdXQpXG4gIFxuICAvL21vZGFsIGV2ZW50c1xuICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2xvYWRBZGRUYXNrTW9kYWwpXG4gIG1vZGFsT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9jbG9zZU1vZGFsKVxuICBjbG9zZU1vZGFsQnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfY2xvc2VNb2RhbClcbiAgfSlcblxuICAvL3Byb2plY3RzIGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBfbG9hZFByb2plY3RMaXN0KCkge1xuICAgIF9yZXNldFByb2plY3RMaXN0KClcbiAgICBsZXQgcHJvamVjdHMgPSBhcHAuZ2V0UHJvamVjdHMoKVxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICBsZXQgdGFibGVSb3cgPSBwcm9qZWN0c1RhYmxlLmluc2VydFJvdyhpbmRleClcblxuICAgICAgbGV0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgIHByb2plY3RJdGVtLm9uY2xpY2sgPSBfbWFrZUFjdGl2ZVByb2plY3RcbiAgICAgIHByb2plY3RJdGVtLmlubmVyVGV4dCA9IHByb2plY3QubmFtZVxuICAgICAgcHJvamVjdEl0ZW0uZGF0YXNldC5pbmRleE51bWJlciA9IGluZGV4XG5cbiAgICAgIGxldCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgZGVsZXRlQnV0dG9uLm9uY2xpY2sgPSBfZGVsZXRlUHJvamVjdFxuICAgICAgZGVsZXRlQnV0dG9uLmlubmVyVGV4dCA9ICd4J1xuXG4gICAgICB0YWJsZVJvdy5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSlcbiAgICAgIHRhYmxlUm93LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbilcbiAgICB9KVxuICAgIF9oaWdobGlnaHRBY3RpdmVQcm9qZWN0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9oaWdobGlnaHRBY3RpdmVQcm9qZWN0KCkge1xuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKVxuICAgIGxldCBwcm9qZWN0cyA9IGFwcC5nZXRQcm9qZWN0cygpXG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChwcm9qZWN0Lm5hbWUgPT09IGFjdGl2ZVByb2plY3QubmFtZSkge1xuICAgICAgICBsZXQgYWN0aXZlRE9NRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWluZGV4LW51bWJlcj1cIiR7aW5kZXh9XCJdYClcbiAgICAgICAgYWN0aXZlRE9NRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBfcmVzZXRQcm9qZWN0TGlzdCgpIHtcbiAgICBsZXQgcm93Q291bnQgPSBwcm9qZWN0c1RhYmxlLnJvd3MubGVuZ3RoXG4gICAgZm9yIChsZXQgaSA9IHJvd0NvdW50IC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHByb2plY3RzVGFibGUuZGVsZXRlUm93KGkpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX21ha2VBY3RpdmVQcm9qZWN0KCkge1xuICAgIGFwcC5zd2l0Y2hBY3RpdmVQcm9qZWN0KGFwcC5nZXRQcm9qZWN0cygpW3RoaXMuZGF0YXNldC5pbmRleE51bWJlcl0pXG4gICAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gICAgX2xvYWRUYXNrcygpXG4gIH1cblxuICBmdW5jdGlvbiBfYWRkUHJvamVjdCgpIHtcbiAgICBsZXQgbmV3UHJvamVjdE5hbWUgPSBhZGRQcm9qZWN0SW5wdXQudmFsdWUudHJpbSgpXG4gICAgaWYgKG5ld1Byb2plY3ROYW1lID09PSAnJyB8fCBfY2hlY2tEdXBsaWNhdGVQcm9qZWN0KG5ld1Byb2plY3ROYW1lKSkgcmV0dXJuXG4gICAgYXBwLmNyZWF0ZVByb2plY3QobmV3UHJvamVjdE5hbWUpXG4gICAgX2xvYWRQcm9qZWN0TGlzdCgpXG4gICAgX3Jlc2V0SW5wdXRGaWVsZHMoW2FkZFByb2plY3RJbnB1dF0pXG4gIH1cblxuICBmdW5jdGlvbiBfY2hlY2tEdXBsaWNhdGVQcm9qZWN0KG5ld1Byb2plY3ROYW1lKSB7XG4gICAgbGV0IHByb2plY3RzID0gYXBwLmdldFByb2plY3RzKClcbiAgICBsZXQgZHVwbGljYXRlUmVzdWx0ID0gZmFsc2VcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBpZiAobmV3UHJvamVjdE5hbWUgPT09IHByb2plY3QubmFtZSkge1xuICAgICAgICBkdXBsaWNhdGVSZXN1bHQgPSB0cnVlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gZHVwbGljYXRlUmVzdWx0XG4gIH1cblxuICBmdW5jdGlvbiBfZGVsZXRlUHJvamVjdCgpIHtcbiAgICBhcHAuZGVsUHJvamVjdCh0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuZGF0YXNldC5pbmRleE51bWJlcilcbiAgICBfbG9hZFByb2plY3RMaXN0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zdWJtaXRQcm9qZWN0SW5wdXQoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIF9hZGRQcm9qZWN0KClcbiAgICB9XG4gIH1cblxuICAvL3Rhc2tzIGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBfbG9hZFRhc2tzKCkge1xuICAgIGxldCBwcm9qZWN0TmFtZUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUtcHJvamVjdC1oZWFkZXInKVxuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKVxuICAgIHByb2plY3ROYW1lSGVhZGVyLmlubmVyVGV4dCA9IGFjdGl2ZVByb2plY3QubmFtZVxuICAgIFxuICAgIF9yZXNldFRhc2tzKClcbiAgICBfY3JlYXRlVGFza3NET00oKVxuICAgIFxuICB9XG5cbiAgZnVuY3Rpb24gX3Jlc2V0VGFza3MoKSB7XG4gICAgbGV0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzJylcbiAgICB0YXNrcy5pbm5lckhUTUwgPSAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZVRhc2tzRE9NKCkge1xuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKVxuICAgIGxldCB0YXNrc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcycpXG5cbiAgICBhY3RpdmVQcm9qZWN0LmdldFRhc2tzKCkuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgIGxldCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZCgndGFzaycpXG4gICAgICBsZXQgdGFza01haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgdGFza01haW4uY2xhc3NMaXN0LmFkZCgndGFzay1tYWluJylcbiAgICAgIGxldCBjb21wbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBjb21wbGV0ZUJ1dHRvbi5vbmNsaWNrID0gX3RvZ2dsZUNvbXBsZXRlVGFza1xuICAgICAgY29tcGxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnY29tcGxldGUtdGFzay1idG4nKVxuICAgICAgaWYgKHRhc2suY29tcGxldGUpIGNvbXBsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJylcbiAgICAgIGNvbXBsZXRlQnV0dG9uLmRhdGFzZXQuaW5kZXhOdW1iZXIgPSBpbmRleFxuICAgICAgbGV0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKVxuICAgICAgdGFza05hbWUuaW5uZXJUZXh0ID0gdGFzay50aXRsZVxuICAgICAgdGFza05hbWUuZGF0YXNldC5tb2RhbCA9ICdlZGl0J1xuICAgICAgdGFza05hbWUuZGF0YXNldC5pbmRleE51bWJlciA9IGluZGV4XG4gICAgICB0YXNrTmFtZS5vbmNsaWNrID0gX2xvYWRFZGl0VGFza01vZGFsXG4gICAgICBsZXQgZGVsVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBkZWxUYXNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2RlbC10YXNrLWJ0bicpXG4gICAgICBkZWxUYXNrQnV0dG9uLmlubmVyVGV4dCA9ICd4J1xuICAgICAgZGVsVGFza0J1dHRvbi5kYXRhc2V0LmluZGV4TnVtYmVyID0gaW5kZXhcbiAgICAgIGRlbFRhc2tCdXR0b24ub25jbGljayA9IF9kZWxldGVUYXNrXG4gICAgICBsZXQgdGFza0luZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgdGFza0luZm8uY2xhc3NMaXN0LmFkZCgndGFzay1pbmZvJylcbiAgICAgIGxldCB0YXNrTWlzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICB0YXNrTWlzYy5jbGFzc0xpc3QuYWRkKCd0YXNrLW1pc2MnKVxuICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgICAgdGFza1ByaW9yaXR5LmlubmVyVGV4dCA9IHRhc2sucHJpb3JpdHlcbiAgICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgICAgdGFza0RhdGUuaW5uZXJUZXh0ID0gdGFzay5kdWVEYXRlXG5cbiAgICAgIHRhc2tNaXNjLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eSlcbiAgICAgIHRhc2tNaXNjLmFwcGVuZENoaWxkKHRhc2tEYXRlKVxuXG4gICAgICB0YXNrSW5mby5hcHBlbmRDaGlsZCh0YXNrTmFtZSlcbiAgICAgIHRhc2tJbmZvLmFwcGVuZENoaWxkKHRhc2tNaXNjKVxuXG4gICAgICB0YXNrTWFpbi5hcHBlbmRDaGlsZCh0YXNrSW5mbylcbiAgICAgIHRhc2tNYWluLmFwcGVuZENoaWxkKGRlbFRhc2tCdXR0b24pXG5cbiAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoY29tcGxldGVCdXR0b24pXG4gICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tNYWluKVxuXG4gICAgICB0YXNrc0Rpdi5hcHBlbmRDaGlsZCh0YXNrRGl2KVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBfcmV0cmlldmVBZGRUYXNrSW5wdXRzKCkge1xuICAgIGxldCB0YXNrTmFtZVZhbHVlID0gdGFza05hbWVJbnB1dC52YWx1ZVxuICAgIGxldCBkYXRlVmFsdWUgPSBkYXRlSW5wdXQudmFsdWVcbiAgICBsZXQgdGFza1ByaW9yaXR5VmFsdWUgPSB0YXNrUHJpb3JpdHlJbnB1dC52YWx1ZVxuICAgIGxldCBkZXNjcmlwdGlvblZhbHVlID0gZGVzY3JpcHRpb25JbnB1dC52YWx1ZVxuXG4gICAgX3Jlc2V0SW5wdXRGaWVsZHMoW3Rhc2tOYW1lSW5wdXQsIGRhdGVJbnB1dCwgdGFza1ByaW9yaXR5SW5wdXQsIGRlc2NyaXB0aW9uSW5wdXRdKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOmAke3Rhc2tOYW1lVmFsdWV9YCxcbiAgICAgIGRlc2NyaXB0aW9uOmAke2Rlc2NyaXB0aW9uVmFsdWV9YCxcbiAgICAgIGR1ZURhdGU6ZGF0ZVZhbHVlLFxuICAgICAgcHJpb3JpdHk6YCR7dGFza1ByaW9yaXR5VmFsdWV9YFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9zdWJtaXRBZGRUYXNrSW5wdXRzKCkge1xuICAgIGxldCBpbnB1dFZhbHVlcyA9IF9yZXRyaWV2ZUFkZFRhc2tJbnB1dHMoKVxuICAgIGFwcC5nZXRBY3RpdmVQcm9qZWN0KCkuYWRkVGFzayhpbnB1dFZhbHVlcy50aXRsZSwgaW5wdXRWYWx1ZXMuZGVzY3JpcHRpb24sIGlucHV0VmFsdWVzLmR1ZURhdGUsIGlucHV0VmFsdWVzLnByaW9yaXR5KVxuICAgIF9sb2FkVGFza3MoKVxuICAgIF9jbG9zZU1vZGFsKClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWxldGVUYXNrKCkge1xuICAgIGxldCBhY3RpdmVQcm9qZWN0ID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKVxuICAgIGFjdGl2ZVByb2plY3QuZGVsVGFzayh0aGlzLmRhdGFzZXQuaW5kZXhOdW1iZXIpXG4gICAgX2xvYWRUYXNrcygpXG4gIH1cblxuICBmdW5jdGlvbiBfdG9nZ2xlQ29tcGxldGVUYXNrKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZGF0YXNldC5pbmRleE51bWJlclxuICAgIFxuICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnY29tcGxldGUnKSkge1xuICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnY29tcGxldGUnKVxuICAgIH1cblxuICAgIGFwcC5nZXRBY3RpdmVQcm9qZWN0KCkudG9nZ2xlVGFza0NvbXBsZXRpb24oaW5kZXgpXG4gIH1cblxuICAvL2dlbmVyYWwgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIF9yZXNldElucHV0RmllbGRzKGlucHV0cykge1xuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXQudmFsdWUgPSAnJ1xuICAgIH0pXG4gIH1cblxuICAvL21vZGFsIGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBfb3Blbk1vZGFsKCkge1xuICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpXG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnb24nKVxuICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdvbicpXG4gIH1cblxuICBmdW5jdGlvbiBfY2xvc2VNb2RhbCgpIHtcbiAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKVxuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ29uJylcbiAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnb24nKVxuICB9XG5cbiAgZnVuY3Rpb24gX2xvYWRBZGRUYXNrTW9kYWwoKSB7XG4gICAgbGV0IG1vZGFsVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdGl0bGUnKVxuICAgIG1vZGFsVGl0bGUuaW5uZXJUZXh0ID0gJ0FkZCBUYXNrJ1xuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3VibWl0JylcbiAgICBzdWJtaXRCdXR0b24uaW5uZXJUZXh0ID0gJ0FkZCdcbiAgICBzdWJtaXRCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfZWRpdFRhc2spXG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX3N1Ym1pdEFkZFRhc2tJbnB1dHMpXG4gICAgX3Jlc2V0SW5wdXRGaWVsZHMoW3Rhc2tOYW1lSW5wdXQsIGRhdGVJbnB1dCwgdGFza1ByaW9yaXR5SW5wdXQsIGRlc2NyaXB0aW9uSW5wdXRdKVxuICAgIF9vcGVuTW9kYWwoKVxuICB9XG5cbiAgZnVuY3Rpb24gX2xvYWRFZGl0VGFza01vZGFsKCkge1xuICAgIGxldCBtb2RhbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXRpdGxlJylcbiAgICBsZXQgaW5kZXggPSB0aGlzLmRhdGFzZXQuaW5kZXhOdW1iZXJcbiAgICBtb2RhbFRpdGxlLmlubmVyVGV4dCA9ICdFZGl0IFRhc2snXG4gICAgbGV0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQnKVxuICAgIHN1Ym1pdEJ1dHRvbi5pbm5lclRleHQgPSAnQ29uZmlybSBDaGFuZ2VzJ1xuICAgIHN1Ym1pdEJ1dHRvbi5kYXRhc2V0LmluZGV4TnVtYmVyID0gaW5kZXhcbiAgICBzdWJtaXRCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfc3VibWl0QWRkVGFza0lucHV0cylcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfZWRpdFRhc2spXG4gICAgX29wZW5Nb2RhbCgpXG4gICAgX2xvYWRFZGl0VGFza0lucHV0VmFsdWVzKGluZGV4KVxuICB9XG5cbiAgZnVuY3Rpb24gX2VkaXRUYXNrKCkge1xuICAgIGxldCB0YXNrID0gYXBwLmdldEFjdGl2ZVByb2plY3QoKS5nZXRUYXNrcygpWyt0aGlzLmRhdGFzZXQuaW5kZXhOdW1iZXJdXG5cbiAgICB0YXNrLnRpdGxlID0gdGFza05hbWVJbnB1dC52YWx1ZVxuICAgIHRhc2suZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbklucHV0LnZhbHVlXG4gICAgdGFzay5kdWVEYXRlID0gZGF0ZUlucHV0LnZhbHVlXG4gICAgdGFzay5wcmlvcml0eSA9IHRhc2tQcmlvcml0eUlucHV0LnZhbHVlXG5cbiAgICBfbG9hZFRhc2tzKClcbiAgICBfY2xvc2VNb2RhbCgpXG4gIH1cblxuICBmdW5jdGlvbiBfbG9hZEVkaXRUYXNrSW5wdXRWYWx1ZXMoaW5kZXgpIHtcbiAgICBsZXQgdGFzayA9IGFwcC5nZXRBY3RpdmVQcm9qZWN0KCkuZ2V0VGFza3MoKVtpbmRleF1cblxuICAgIHRhc2tOYW1lSW5wdXQudmFsdWUgPSB0YXNrLnRpdGxlXG4gICAgZGF0ZUlucHV0LnZhbHVlID0gdGFzay5kdWVEYXRlXG4gICAgdGFza1ByaW9yaXR5SW5wdXQudmFsdWUgPSB0YXNrLnByaW9yaXR5XG4gICAgZGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb25cbiAgfVxuXG4gIF9sb2FkUHJvamVjdExpc3QoKVxuICBfbG9hZFRhc2tzKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2NyZWVuQ29udHJvbGxlciIsImltcG9ydCBwcm9qZWN0IGZyb20gXCIuL3Byb2plY3QuanNcIlxuXG5jb25zdCBhcHBDb250cm9sbGVyID0gKCkgPT4ge1xuICBsZXQgcHJvamVjdHMgPSBbXVxuICBsZXQgYWN0aXZlUHJvamVjdCA9IHByb2plY3QoJ0RlZmF1bHQnKVxuICBwcm9qZWN0cy5wdXNoKGFjdGl2ZVByb2plY3QpXG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lKSB7XG4gICAgbGV0IG5ld1Byb2plY3QgPSBwcm9qZWN0KG5hbWUpXG4gICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KVxuICB9XG5cbiAgZnVuY3Rpb24gc3dpdGNoQWN0aXZlUHJvamVjdChuZXdBY3RpdmVQcm9qZWN0KSB7XG4gICAgYWN0aXZlUHJvamVjdCA9IG5ld0FjdGl2ZVByb2plY3RcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbFByb2plY3QoaW5kZXgpIHtcbiAgICBpZiAocHJvamVjdHNbaW5kZXhdID09PSBhY3RpdmVQcm9qZWN0KSByZXR1cm5cblxuICAgIHByb2plY3RzLnNwbGljZShpbmRleCwgMSlcbiAgfVxuXG4gIGNvbnN0IGdldEFjdGl2ZVByb2plY3QgPSAoKSA9PiBhY3RpdmVQcm9qZWN0XG5cbiAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBwcm9qZWN0c1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlUHJvamVjdCxcbiAgICBzd2l0Y2hBY3RpdmVQcm9qZWN0LFxuICAgIGRlbFByb2plY3QsXG4gICAgZ2V0QWN0aXZlUHJvamVjdCxcbiAgICBnZXRQcm9qZWN0c1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcENvbnRyb2xsZXIiLCJpbXBvcnQgdGFzayBmcm9tICcuL21vZHVsZXMvdGFzay5qcydcbmltcG9ydCBwcm9qZWN0IGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0LmpzJ1xuaW1wb3J0IGFwcENvbnRyb2xsZXIgZnJvbSAnLi9tb2R1bGVzL2FwcENvbnRyb2xsZXIuanMnXG5pbXBvcnQgc2NyZWVuQ29udHJvbGxlciBmcm9tICcuL21vZHVsZXMvc2NyZWVuQ29udHJvbGxlci5qcydcblxuc2NyZWVuQ29udHJvbGxlcigpXG5cbi8qXG4gIGZ1bmN0aW9uIF9hZGRQcm9qZWN0KCkge1xuICAgIGxldCBuZXdQcm9qZWN0TmFtZSA9IGFkZHByamVjdGluXG4gICAgaWYgKGFkZFByb2plY3RJbnB1dC52YWx1ZS50cmltKCkgPT09ICcnIHx8IF9jaGVja0R1cGxpY2F0ZVByb2plY3QoKSkgcmV0dXJuXG4gICAgYXBwLmNyZWF0ZVByb2plY3QoYWRkUHJvamVjdElucHV0LnZhbHVlKVxuICAgIF9sb2FkUHJvamVjdExpc3QoKVxuICAgIF9yZXNldElucHV0RmllbGQoYWRkUHJvamVjdElucHV0KVxuICB9XG4qLyJdLCJuYW1lcyI6WyJuYW1lIiwidGFza3MiLCJhZGRUYXNrIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImR1ZURhdGUiLCJwcmlvcml0eSIsIm5ld1Rhc2siLCJjb21wbGV0ZSIsInB1c2giLCJkZWxUYXNrIiwiaW5kZXgiLCJzcGxpY2UiLCJ0b2dnbGVUYXNrQ29tcGxldGlvbiIsInRhc2siLCJnZXRUYXNrcyIsImFwcCIsInByb2plY3RzIiwiYWN0aXZlUHJvamVjdCIsImNyZWF0ZVByb2plY3QiLCJuZXdQcm9qZWN0Iiwic3dpdGNoQWN0aXZlUHJvamVjdCIsIm5ld0FjdGl2ZVByb2plY3QiLCJkZWxQcm9qZWN0IiwiZ2V0QWN0aXZlUHJvamVjdCIsImdldFByb2plY3RzIiwicHJvamVjdHNUYWJsZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZFByb2plY3RJbnB1dCIsImFkZFByb2plY3RCdXR0b24iLCJhZGRUYXNrQnV0dG9uIiwibW9kYWxPdmVybGF5IiwiY2xvc2VNb2RhbEJ1dHRvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFza05hbWVJbnB1dCIsImRhdGVJbnB1dCIsInRhc2tQcmlvcml0eUlucHV0IiwiZGVzY3JpcHRpb25JbnB1dCIsIl9sb2FkUHJvamVjdExpc3QiLCJpIiwicm93cyIsImxlbmd0aCIsImRlbGV0ZVJvdyIsIl9yZXNldFByb2plY3RMaXN0IiwiZm9yRWFjaCIsInByb2plY3QiLCJ0YWJsZVJvdyIsImluc2VydFJvdyIsInByb2plY3RJdGVtIiwiY3JlYXRlRWxlbWVudCIsIm9uY2xpY2siLCJfbWFrZUFjdGl2ZVByb2plY3QiLCJpbm5lclRleHQiLCJkYXRhc2V0IiwiaW5kZXhOdW1iZXIiLCJkZWxldGVCdXR0b24iLCJfZGVsZXRlUHJvamVjdCIsImFwcGVuZENoaWxkIiwiY2xhc3NMaXN0IiwiYWRkIiwiX2hpZ2hsaWdodEFjdGl2ZVByb2plY3QiLCJ0aGlzIiwiX2xvYWRUYXNrcyIsIl9hZGRQcm9qZWN0IiwibmV3UHJvamVjdE5hbWUiLCJ2YWx1ZSIsInRyaW0iLCJkdXBsaWNhdGVSZXN1bHQiLCJfY2hlY2tEdXBsaWNhdGVQcm9qZWN0IiwiX3Jlc2V0SW5wdXRGaWVsZHMiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwicHJvamVjdE5hbWVIZWFkZXIiLCJpbm5lckhUTUwiLCJ0YXNrc0RpdiIsInRhc2tEaXYiLCJ0YXNrTWFpbiIsImNvbXBsZXRlQnV0dG9uIiwiX3RvZ2dsZUNvbXBsZXRlVGFzayIsInRhc2tOYW1lIiwibW9kYWwiLCJfbG9hZEVkaXRUYXNrTW9kYWwiLCJkZWxUYXNrQnV0dG9uIiwiX2RlbGV0ZVRhc2siLCJ0YXNrSW5mbyIsInRhc2tNaXNjIiwidGFza1ByaW9yaXR5IiwidGFza0RhdGUiLCJfY3JlYXRlVGFza3NET00iLCJfc3VibWl0QWRkVGFza0lucHV0cyIsImlucHV0VmFsdWVzIiwidGFza05hbWVWYWx1ZSIsImRhdGVWYWx1ZSIsInRhc2tQcmlvcml0eVZhbHVlIiwiZGVzY3JpcHRpb25WYWx1ZSIsIl9yZXRyaWV2ZUFkZFRhc2tJbnB1dHMiLCJfY2xvc2VNb2RhbCIsImNvbnRhaW5zIiwicmVtb3ZlIiwiaW5wdXRzIiwiaW5wdXQiLCJfb3Blbk1vZGFsIiwibW9kYWxUaXRsZSIsInN1Ym1pdEJ1dHRvbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiX2VkaXRUYXNrIiwiX2xvYWRFZGl0VGFza0lucHV0VmFsdWVzIiwiZXZlbnQiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJidXR0b24iXSwic291cmNlUm9vdCI6IiJ9