using LuminosityWebAPI.Domain;
using LuminosityWebAPI.Infra.DataContexts;
using System;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LuminosityWebAPI.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/v1/public")]
    public class ClienteController: ApiController
    {
        private LuminosityWebApiDataContext db = new LuminosityWebApiDataContext();

        // Listar todos
        [Route("clientes")]
        public HttpResponseMessage GetClientes()
        {
            var result = db.Clientes.ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // Adicionar Novo
        [HttpPost]
        [Route("clientes")]
        public HttpResponseMessage PostCliente(Cliente cliente)
        {
            if (cliente == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            try
            {
                db.Clientes.Add(cliente);
                db.SaveChanges();

                var result = cliente;
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao incluir Cliente, verifique se o e-mail e o CPF estão corretos.");
            }
        }

        // Alterar
        [HttpPut]
        [Route("clientes")]
        public HttpResponseMessage PutCliente(Cliente cliente)
        {
            if (cliente == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            try
            {
                db.Entry<Cliente>(cliente).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                var result = cliente;
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao alterar Cliente, verifique se o e-mail e o CPF estão corretos.");
            }
        }

        // Delete
        [HttpDelete]
        [Route("clientes")]
        public HttpResponseMessage DeleteCliente(int clienteId)
        {

            if (clienteId <= 0)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            try
            {
                db.Clientes.Remove(db.Clientes.Find(clienteId));
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, "Cliente excluido.");
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao excluir Cliente.");
            }

        }
    }
}