<template>
     <div class="container bg-light">
    <!-- card of question -->
    <div class="bg-light">
        <div class="d-flex justify-content-between">
          <div class="col-3 my-auto text-center">
            <div>
              <img class="border border-success" src="@/assets/up.png" alt="gagal load image up" style="width:50px">
            </div>
            <div>
              <h3> 3</h3>
            </div>
            <div>
              <img src="@/assets/down.png" alt="gagal load image down" style="width: 50px">
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-3 my-auto">
                <img class="rounded-circle" src="https://cdn3.iconfinder.com/data/icons/business-and-finance-icons/512/Business_Man-512.png" alt="image profile gagal load" style="width: 100px">
              </div>
              <div class="col-9 my-auto">
                <h3 class="font-weight-bold "> Questioner</h3> 
                <h5 class="font-weight-bold"> Question</h5> 
              </div>
            </div>
          </div> 
          <div class="col-3 my-auto">
            <button class="close" data-toggle="modal" data-target="#deleteQuestion">
                <span aria-hidden="true">&times;</span>
            </button>
              <div class="modal fade" id="deleteQuestion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-dark">
                        <h5 class="modal-title text-white font-weight-bold"> Are you sure delete this question ?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span class="text-white" aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        ...
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
        <div class="container">
          <div class="panel mx-auto border border-dark p-2" style="width : 80%">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad incidunt quia reiciendis consectetur, beatae amet at dolore voluptatibus repellat. Dolorem eveniet aut quam amet illo quo debitis nihil cupiditate nulla!</p>
          </div>
        </div>
    </div>

    <!-- Answer -->
    <div  class="container" id="answer">
       <div class="bg-light mb-2">
        <div class="bg-success rounded p-3">
         <!-- Header penjawab-->
          <h4 class="font-weight-bold"> Best Answer :</h4>
          <div class="container">
              <div class="bg-light">
              <div class="d-flex justify-content-between">
                <div class="col-3 my-auto text-center">
                  <div>
                    <img class="border border-success" src="@/assets/up.png" alt="gagal load image up" style="width:50px">
                  </div>
                  <div>
                    <h3> 3</h3>
                  </div>
                  <div>
                    <img src="@/assets/down.png" alt="gagal load image down" style="width: 50px">
                  </div>
                </div>
                <div class="col-6">
                  <div class="row">
                    <div class="col-3 my-auto">
                      <img class="rounded-circle" src="https://cdn3.iconfinder.com/data/icons/business-and-finance-icons/512/Business_Man-512.png" alt="image profile gagal load" style="width: 100px">
                    </div>
                    <div class="col-9 my-auto">
                      <h3 class="font-weight-bold "> Answered! </h3>
                    </div>
                  </div>
                </div> 
                <div class="col-3 my-auto">
                  <!-- modal delete-->
                  <button class="close" data-toggle="modal" data-target="#deleteAnswered">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  
                  <div class="modal fade" id="deleteAnswered" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header bg-dark">
                            <h5 class="modal-title text-white font-weight-bold"> Are you sure delete this question ?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span class="text-white" aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            ...
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                  </div>

                    <!-- modal update -->
                  <button class="close mr-2" data-toggle="modal" data-target="#updateAnswered">
                      <span aria-hidden="true" class="fa fa-edit fa-sm"></span>
                  </button>
                  <div class="modal fade" id="updateAnswered" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header bg-dark">
                            <h5 class="modal-title text-white font-weight-bold"> Update Answer ?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span class="text-white" aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            ...
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                  </div>

                </div>
              </div>
             </div>
          </div>
          <div class="container">
            <div class="bg-success p-3">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At doloremque ad distinctio porro ut. Hic, facilis nesciunt non magni deserunt atque a quas quia neque omnis inventore laboriosam explicabo amet?</p>
            </div>
          </div>
        </div>
       </div>

      <div class="bg-light">
          <div class="bg-success rounded p-3">
          <!-- Header penjawab-->
            <h4 class="font-weight-bold"> Best Answer :</h4>
            <div class="container">
                <div class="bg-light">
                <div class="d-flex justify-content-between">
                  <div class="col-3 my-auto text-center">
                    <div>
                      <img class="border border-success" src="@/assets/up.png" alt="gagal load image up" style="width:50px">
                    </div>
                    <div>
                      <h3> 3</h3>
                    </div>
                    <div>
                      <img src="@/assets/down.png" alt="gagal load image down" style="width: 50px">
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <div class="col-3 my-auto">
                        <img class="rounded-circle" src="https://cdn3.iconfinder.com/data/icons/business-and-finance-icons/512/Business_Man-512.png" alt="image profile gagal load" style="width: 100px">
                      </div>
                      <div class="col-9 my-auto">
                        <h3 class="font-weight-bold "> Answered! </h3>
                      </div>
                    </div>
                  </div> 
                  <div class="col-3 my-auto">
                    <!-- modal delete-->
                    <button class="close" data-toggle="modal" data-target="#deleteAnswered">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    
                    <div class="modal fade" id="deleteAnswered" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header bg-dark">
                              <h5 class="modal-title text-white font-weight-bold"> Are you sure delete this question ?</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span class="text-white" aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              ...
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                          </div>
                        </div>
                    </div>

                      <!-- modal update -->
                    <button class="close mr-2" data-toggle="modal" data-target="#updateAnswered">
                        <span aria-hidden="true" class="fa fa-edit fa-sm"></span>
                    </button>
                    <div class="modal fade" id="updateAnswered" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header bg-dark">
                              <h5 class="modal-title text-white font-weight-bold"> Update Answer ?</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span class="text-white" aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              ...
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                          </div>
                        </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="bg-success p-3">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At doloremque ad distinctio porro ut. Hic, facilis nesciunt non magni deserunt atque a quas quia neque omnis inventore laboriosam explicabo amet?</p>
              </div>
            </div>
          </div>
       </div>
       
      </div>

      <div class="mt-3">
        <a href="text-muted"> Show all...</a>
      </div>

      <div>
        <div class="form-group">
          <label for="exampleInputEmail1">Answer : </label>
          <textarea  rows="4" class="form-control" placeholder="Your Answer ....">
          </textarea>
        </div>
        <button type="submit" class="btn btn-primary">Answer This Question</button>
      </div>
  </div>
</template>